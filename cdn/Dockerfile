FROM python:3.8-slim-buster

WORKDIR /app
RUN mkdir uploads
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "server.py"]