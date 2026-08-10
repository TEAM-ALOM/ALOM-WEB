FROM python

WORKDIR app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8081

ENTRYPOINT ["uvicorn", "main:app", "--reload", "--host=0.0.0.0", "--port=8081"]