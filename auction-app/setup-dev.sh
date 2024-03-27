if [ ! -f /app/.setup_done ]; then

# generate prisma client
npx prisma generate

# push db schema to db
npx prisma db push

# seed the db
npx prisma db seed 

#!/bin/bash

# Navigate to the next-auth directory within node_modules
cd /app/node_modules/next-auth/lib || exit

# Check if the file exists
if [ -f "index.js" ]; then
    # Modify the file
    sed -i '110s/^/if('"'"'headers'"'"' in response) {\n    response.headers.append("set-cookie", cookie);\n} else {\n    response.appendHeader("set-cookie", cookie);\n}\n/' index.js
fi

cd /app || exit
# mark setup as done
touch /app/.setup_done

fi

# run the app
npm run dev

