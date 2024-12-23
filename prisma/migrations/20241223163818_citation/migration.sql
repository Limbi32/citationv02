-- CreateTable
CREATE TABLE "employes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "auteur" TEXT NOT NULL,

    CONSTRAINT "employes_pkey" PRIMARY KEY ("id")
);
