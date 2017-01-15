FROM debian:jessie-slim
MAINTAINER Daniel McLaughlin <daniel@danielmclaughl.in>

RUN BUILD_PACKAGES="python-pip python-dev gcc wget xz-utils" && \
  apt-get update && apt-get install -y --no-install-recommends $BUILD_PACKAGES && \
  pip install flask gunicorn && \
  wget http://download.gna.org/wkhtmltopdf/0.12/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz && \
  tar xf wkhtmltox-0.12.4_linux-generic-amd64.tar.xz -C /usr/local/bin --strip=2 wkhtmltox/bin/wkhtmltopdf && \
  rm wkhtmltox-0.12.4_linux-generic-amd64.tar.xz && \
  apt-get remove --purge -y $BUILD_PACKAGES $(apt-mark showauto) && \
  apt-get install -y --no-install-recommends \
	fontconfig \
	libfreetype6 \
	libx11-6 \
	libxext6 \
	libxrender1 \
	python \
	python-setuptools \
	zlib1g-dev && \
  rm -rf /var/lib/apt/lists/*


ADD app.py /proxy/app.py
WORKDIR /proxy

USER nobody

CMD gunicorn --bind 0.0.0.0:$PORT app:app
