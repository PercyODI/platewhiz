print("Starting ...")

db = db.getSiblingDB('platewhiz')

db.createUser(
    {
        user: "platewhizuser",
        pwd: "platewhizpass",
        roles: [
            {
                role: "readWrite",
                db: "platewhiz"
            }
        ]
    }
);

db.createCollection("test");

print("... End")