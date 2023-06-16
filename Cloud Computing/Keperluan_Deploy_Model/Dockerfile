# Menggunakan base image Python
FROM python:3.11-slim

# Mengatur working directory di dalam container
WORKDIR /app

# Menyalin file requirements.txt ke dalam container
COPY . .

# Menginstal dependensi yang diperlukan
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin file app.py ke dalam container
COPY app.py .

# Menjalankan aplikasi Flask
CMD ["python", "app.py"]
