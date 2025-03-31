FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    asterisk \
    && rm -rf /var/lib/apt/lists/*

# Copy configuration files
COPY config/ /etc/asterisk/

# Expose ports
EXPOSE 5060/udp 5060/tcp 5038

# Start Asterisk
CMD ["asterisk", "-f"] 