-- Audit trigger function for PostgreSQL
-- This function automatically logs all changes to audited tables

CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
DECLARE
  old_data JSONB;
  new_data JSONB;
  actor_id_var UUID;
BEGIN
  -- Get actor ID from session variable (set by application)
  actor_id_var := current_setting('app.current_user_id', TRUE)::UUID;
  
  IF (TG_OP = 'DELETE') THEN
    old_data := to_jsonb(OLD);
    INSERT INTO audits (
      entity_type,
      entity_id,
      actor_id,
      action_type,
      before,
      after,
      ip,
      user_agent,
      timestamp
    ) VALUES (
      CASE 
        WHEN TG_TABLE_NAME = 'users' THEN 'USER'
        WHEN TG_TABLE_NAME = 'profiles' THEN 'PROFILE'
        WHEN TG_TABLE_NAME = 'positions' THEN 'POSITION'
        WHEN TG_TABLE_NAME = 'achievements' THEN 'ACHIEVEMENT'
        WHEN TG_TABLE_NAME = 'certificates' THEN 'CERTIFICATE'
        WHEN TG_TABLE_NAME = 'verifications' THEN 'VERIFICATION'
        ELSE 'USER'
      END::entity_type,
      OLD.id::TEXT,
      actor_id_var,
      'DELETE',
      old_data,
      NULL,
      current_setting('app.client_ip', TRUE),
      current_setting('app.user_agent', TRUE),
      NOW()
    );
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    old_data := to_jsonb(OLD);
    new_data := to_jsonb(NEW);
    INSERT INTO audits (
      entity_type,
      entity_id,
      actor_id,
      action_type,
      before,
      after,
      ip,
      user_agent,
      timestamp
    ) VALUES (
      CASE 
        WHEN TG_TABLE_NAME = 'users' THEN 'USER'
        WHEN TG_TABLE_NAME = 'profiles' THEN 'PROFILE'
        WHEN TG_TABLE_NAME = 'positions' THEN 'POSITION'
        WHEN TG_TABLE_NAME = 'achievements' THEN 'ACHIEVEMENT'
        WHEN TG_TABLE_NAME = 'certificates' THEN 'CERTIFICATE'
        WHEN TG_TABLE_NAME = 'verifications' THEN 'VERIFICATION'
        ELSE 'USER'
      END::entity_type,
      NEW.id::TEXT,
      actor_id_var,
      'UPDATE',
      old_data,
      new_data,
      current_setting('app.client_ip', TRUE),
      current_setting('app.user_agent', TRUE),
      NOW()
    );
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    new_data := to_jsonb(NEW);
    INSERT INTO audits (
      entity_type,
      entity_id,
      actor_id,
      action_type,
      before,
      after,
      ip,
      user_agent,
      timestamp
    ) VALUES (
      CASE 
        WHEN TG_TABLE_NAME = 'users' THEN 'USER'
        WHEN TG_TABLE_NAME = 'profiles' THEN 'PROFILE'
        WHEN TG_TABLE_NAME = 'positions' THEN 'POSITION'
        WHEN TG_TABLE_NAME = 'achievements' THEN 'ACHIEVEMENT'
        WHEN TG_TABLE_NAME = 'certificates' THEN 'CERTIFICATE'
        WHEN TG_TABLE_NAME = 'verifications' THEN 'VERIFICATION'
        ELSE 'USER'
      END::entity_type,
      NEW.id::TEXT,
      actor_id_var,
      'CREATE',
      NULL,
      new_data,
      current_setting('app.client_ip', TRUE),
      current_setting('app.user_agent', TRUE),
      NOW()
    );
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for audited tables
CREATE TRIGGER audit_users_trigger
  AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

CREATE TRIGGER audit_profiles_trigger
  AFTER INSERT OR UPDATE OR DELETE ON profiles
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

CREATE TRIGGER audit_positions_trigger
  AFTER INSERT OR UPDATE OR DELETE ON positions
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

CREATE TRIGGER audit_achievements_trigger
  AFTER INSERT OR UPDATE OR DELETE ON achievements
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

CREATE TRIGGER audit_certificates_trigger
  AFTER INSERT OR UPDATE OR DELETE ON certificates
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

CREATE TRIGGER audit_verifications_trigger
  AFTER INSERT OR UPDATE OR DELETE ON verifications
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

