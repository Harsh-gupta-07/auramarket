export async function getProducts() {
    try{
        const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        const response = await raw.json()
        return {success:true, data: response}
    }catch(err){
        console.log(err)
        throw err
    }
} 

