-- Migration: Create call_events table
-- Description: Creates the initial call_events table with UUID primary key and indexes

-- Create call_events table
CREATE TABLE IF NOT EXISTS call_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB NOT NULL,
    source VARCHAR(100) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_call_events_event_type ON call_events(event_type);
CREATE INDEX IF NOT EXISTS idx_call_events_timestamp ON call_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_call_events_source ON call_events(source);
