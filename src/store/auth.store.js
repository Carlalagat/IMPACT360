import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    loading: false,
    error: null,
  }),

  actions: {
    async initialize() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        this.user = data.session.user;
        this.session = data.session;
      }

      // Listen for changes in authentication state
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth event:', event, session);
        this.user = session?.user ?? null;
        this.session = session ?? null;
      });
    },

    async signUp(email, password, fullName) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          // You can pass additional user metadata here
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        alert('Sign up successful! Please check your email to verify your account.');
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async signIn(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/');
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async signInWithOAuth(provider) {
      this.loading = true;
      this.error = null;
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async signOut() {
      this.loading = true;
      this.error = null;
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.user = null;
        this.session = null;
        router.push('/login');
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});