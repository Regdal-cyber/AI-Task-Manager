import psycopg2
import csv
from datetime import datetime

DB_CONFIG = {
    "host": "localhost",
    "database": "task_manager",
    "user": "postgres",
    "password": "artur1103",
    "port": 5432,
}


def export_tasks():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        print("Подключение к базе данных установлено")

        cursor.execute(
            """
            SELECT id, title, description, status, created_at 
            FROM tasks 
            ORDER BY id
        """
        )

        rows = cursor.fetchall()

        if not rows:
            print("В базе данных нет задач. Экспорт не выполнен.")
            return

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"tasks_export_{timestamp}.csv"

        with open(filename, "w", newline="", encoding="utf-8-sig") as file:
            writer = csv.writer(file, delimiter=";")

            writer.writerow(["ID", "Название", "Описание", "Статус", "Дата создания"])

            for row in rows:
                writer.writerow(row)

        print(f"\n Экспорт выполнен успешно!")
        print(f"Файл сохранён: {filename}")
        print(f"Всего задач: {len(rows)}")

    except psycopg2.Error as e:
        print(f"Ошибка подключения к базе данных: {e}")
        print("   Проверьте параметры подключения в DB_CONFIG")
    except Exception as e:
        print(f"Непредвиденная ошибка: {e}")
    finally:
        if "cursor" in locals():
            cursor.close()
        if "conn" in locals():
            conn.close()
            print("Соединение с БД закрыто")


if __name__ == "__main__":
    export_tasks()
