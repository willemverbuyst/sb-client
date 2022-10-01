from datetime import datetime
import json
import re
import datetime


def create_timestamps(json_file):
    buffer = json.dumps(json_file)
    placeholders = re.findall(
        "\%timestamp\%(\S*):(\S*):(\S*):(\S*):(\S*)%%", buffer)

    if len(placeholders) < 1:
        return

    for placeholder in placeholders:
        placeholder_string = f"%timestamp%{placeholder[0]}:{placeholder[1]}:{placeholder[2]}:{placeholder[3]}:{placeholder[4]}%%"

        now = datetime.datetime.now()
        friday = now + datetime.timedelta((4-now.weekday()) % 7)
        time = datetime.time(
            hour=int(placeholder[3]), minute=int(placeholder[4]))

        friday_time = datetime.datetime.combine(friday, time)

        if placeholder[0] == "add":
            ts = friday_time + datetime.timedelta(
                weeks=int(placeholder[1]),
                days=int(placeholder[2])
            )

        if placeholder[0] == "sub":
            ts = datetime.datetime.now() - datetime.timedelta(
                weeks=int(placeholder[1]),
                days=int(placeholder[2]),
            )

        buffer = buffer.replace(placeholder_string, str(int(ts.timestamp())))

    return json.loads(buffer)
