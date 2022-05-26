from dotenv import load_dotenv
import os

load_dotenv()


api_key = os.getenv("API_KEY")


def validate_api_key(api_key_in_header: str) -> bool:
    return api_key == api_key_in_header
