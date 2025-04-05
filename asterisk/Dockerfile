FROM ubuntu:22.04

ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && apt-get install -y \
    asterisk \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/lib/asterisk \
    /var/log/asterisk \
    /var/spool/asterisk \
    /var/run/asterisk \
    /var/lib/asterisk/agi-bin \
    /var/lib/asterisk/keys \
    && chown -R asterisk:asterisk /var/lib/asterisk \
    /var/log/asterisk \
    /var/spool/asterisk \
    /var/run/asterisk \
    /etc/asterisk

COPY config/ /etc/asterisk/

RUN chown -R asterisk:asterisk /etc/asterisk

EXPOSE 5060/udp 5060/tcp 5038 8088

CMD ["asterisk", "-f"] 