CREATE TABLE IF NOT EXISTS telephony_events (
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

-- Create index on event_type for faster queries
CREATE INDEX IF NOT EXISTS idx_telephony_events_event_type ON telephony_events(event_type);

-- Create index on created_at for faster time-based queries
CREATE INDEX IF NOT EXISTS idx_telephony_events_created_at ON telephony_events(created_at); 