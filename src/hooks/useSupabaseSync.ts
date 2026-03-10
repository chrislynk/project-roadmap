import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface CheckboxState {
  [subtaskId: string]: boolean;
}

export function useSupabaseSync(
  localState: CheckboxState,
  setLocalState: (state: CheckboxState) => void
) {
  const [userId, setUserId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Monitor auth state and get current user
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    // Get initial session
    supabase!.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
      if (session?.user?.id) {
        console.log('[Supabase] User authenticated:', session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase!.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
      if (session?.user?.id) {
        console.log('[Supabase] Auth state changed:', session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load initial data from Supabase when user is ready
  useEffect(() => {
    if (!userId || !isSupabaseConfigured()) return;

    const loadFromSupabase = async () => {
      try {
        setSyncing(true);
        const { data, error } = await supabase!
          .from('progress')
          .select('subtask_id, checked')
          .eq('user_id', userId);

        if (error) throw error;

        if (data && data.length > 0) {
          const supabaseState: CheckboxState = {};
          data.forEach((row) => {
            supabaseState[row.subtask_id] = row.checked;
          });

          // Merge with localStorage (Supabase takes precedence)
          setLocalState({ ...localState, ...supabaseState });
          setLastSyncTime(new Date());
          console.log(`[Supabase] Loaded ${data.length} items from cloud`);
        }
      } catch (error) {
        console.error('[Supabase] Failed to load data:', error);
      } finally {
        setSyncing(false);
      }
    };

    loadFromSupabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Sync local changes to Supabase
  const syncToSupabase = useCallback(
    async (subtaskId: string, checked: boolean) => {
      if (!userId || !isSupabaseConfigured()) return;

      try {
        const { error } = await supabase!
          .from('progress')
          .upsert(
            {
              user_id: userId,
              subtask_id: subtaskId,
              checked: checked,
            },
            {
              onConflict: 'user_id,subtask_id',
            }
          );

        if (error) throw error;
        setLastSyncTime(new Date());
      } catch (error) {
        console.error('[Supabase] Failed to sync:', error);
      }
    },
    [userId]
  );

  // Clear all progress in Supabase
  const clearSupabase = useCallback(async () => {
    if (!userId || !isSupabaseConfigured()) return;

    try {
      const { error } = await supabase!
        .from('progress')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
      setLastSyncTime(new Date());
      console.log('[Supabase] Cleared all progress');
    } catch (error) {
      console.error('[Supabase] Failed to clear:', error);
    }
  }, [userId]);

  // Subscribe to realtime changes
  useEffect(() => {
    if (!userId || !isSupabaseConfigured()) return;

    let channel: RealtimeChannel;

    const subscribe = async () => {
      channel = supabase!
        .channel('progress-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'progress',
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            console.log('[Supabase] Realtime update:', payload);

            if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
              const newRecord = payload.new as { subtask_id: string; checked: boolean };
              setLocalState((prev) => ({
                ...prev,
                [newRecord.subtask_id]: newRecord.checked,
              }));
              setLastSyncTime(new Date());
            } else if (payload.eventType === 'DELETE') {
              const oldRecord = payload.old as { subtask_id: string };
              setLocalState((prev) => {
                const newState = { ...prev };
                delete newState[oldRecord.subtask_id];
                return newState;
              });
              setLastSyncTime(new Date());
            }
          }
        )
        .subscribe();
    };

    subscribe();

    return () => {
      if (channel) {
        supabase!.removeChannel(channel);
      }
    };
  }, [userId, setLocalState]);

  return {
    syncing,
    lastSyncTime,
    syncToSupabase,
    clearSupabase,
    isConfigured: isSupabaseConfigured(),
    userId,
  };
}
