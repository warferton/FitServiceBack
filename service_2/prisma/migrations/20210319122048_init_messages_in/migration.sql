-- CreateTable
CREATE TABLE "messages_in" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "message_body" TEXT NOT NULL DEFAULT E'No Message',
    "message_time" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "messages_in.uuid_unique" ON "messages_in"("uuid");
