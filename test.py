import json


path = "mylib.json"

t = {
    "pass" : "password",
    "name" : "luigi"
}

with open(path, 'w') as mypass:
    mypass.write(json.dumps(t))

print(mypass)