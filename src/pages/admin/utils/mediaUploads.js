import {createClient} from '@supabase/supabase-js'

const supabaseUrl= 'https://sxgxbbgoxerrfaatjrqc.supabase.co'
const anon_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4Z3hiYmdveGVycmZhYXRqcnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzQ5MTYxMiwiZXhwIjoyMDYzMDY3NjEyfQ.mjahcBwsmToLGGbvuuGDST3cBOrGxSbFOszs8XkDUss"

const supabase=createClient(supabaseUrl, anon_key)

export default function uploadImage(file) {
    return new Promise((resolve, reject) => {
   if (!file){
    reject("No file uploaded")  
    return
   } 
   const timestamp=new Date().getTime()
   const fileName=timestamp+'-'+file.name
   supabase.storage.from('images').upload(fileName,file,{
    cacheControl:'3600',
    upsert:false
   }).then(()=>{
    const public_url=supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl
    resolve(public_url)
   }).catch(()=>{
    reject('Error uploading file')
   })

})
}





