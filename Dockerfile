FROM ubuntu:xenial
MAINTAINER Daniel McLaughlin <daniel@danielmclaughl.in>

RUN apt-get update && apt-get install -y \
	fontconfig \
	libfreetype6 \
	libx11-6 \
	libxext6 \
	libxrender1 \
	python-pip \
	wget \
	zlib1g-dev
RUN pip install flask gunicorn

RUN wget http://download.gna.org/wkhtmltopdf/0.12/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz && \
    tar xf wkhtmltox-0.12.4_linux-generic-amd64.tar.xz -C /usr/local/bin --strip=2 wkhtmltox/bin/wkhtmltopdf && \
    rm wkhtmltox-0.12.4_linux-generic-amd64.tar.xz


ADD src /src
WORKDIR /src

RUN useradd -m myuser
USER myuser

CMD gunicorn --bind 0.0.0.0:$PORT app:app
