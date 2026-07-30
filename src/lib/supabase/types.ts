export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type LeadStatus = 'New' | 'Contacted' | 'Closed';
export type SubscriberStatus = 'Active' | 'Unsubscribed';
export type UserRole = 'admin' | 'editor' | 'visitor';

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          phone: string | null;
          budget: string;
          message: string;
          status: LeadStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          phone?: string | null;
          budget?: string;
          message: string;
          status?: LeadStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          phone?: string | null;
          budget?: string;
          message?: string;
          status?: LeadStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          status: SubscriberStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          status?: SubscriberStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          status?: SubscriberStatus;
          created_at?: string;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          event_type: string;
          target_path: string;
          device_type: string;
          country_code: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_type: string;
          target_path: string;
          device_type?: string;
          country_code?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_type?: string;
          target_path?: string;
          device_type?: string;
          country_code?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: UserRole;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: UserRole;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      lead_status: LeadStatus;
      subscriber_status: SubscriberStatus;
      user_role: UserRole;
    };
  };
}
