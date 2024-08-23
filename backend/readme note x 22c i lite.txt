command nodejs

setup {
    npm i
    npm sequelize-cli db:migrate
    npm run dev (:
}

=========================== List Command Helper ====================================
Skeleton {
    npx sequelize-cli init
}

database migrations{
    add:
         npx sequelize db:migrate
         npx sequelize db:seed:all

    undo:
        npx sequelize db:migrate:undo:all
        npx sequelize db:seed:undo:all
}

cli command add file {
    file model+migration+attributes : 
        npx sequelize model:generate --name <User> --attributes name:string,job:string
    file migration : 
        npx sequelize migration:create --name=<create_users_table>
    file seeder : 
        npx sequelize seed:generate --name <nama-seeder>.js
}

Error {
    error security = {{ Set-ExecutionPolicy RemoteSigned }}
}