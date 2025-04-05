CREATE TABLE IF NOT EXISTS call_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(255) NOT NULL,
    event_data JSONB NOT NULL,
    channel_id VARCHAR(255),
    caller_id VARCHAR(255),
    called_number VARCHAR(255),
    duration INTEGER,
    queue_name VARCHAR(255),
    agent_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_call_events_event_type ON call_events(event_type);

CREATE INDEX IF NOT EXISTS idx_call_events_created_at ON call_events(created_at); 