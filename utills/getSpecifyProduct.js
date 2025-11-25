export async function fetchProduct(id) {
    try{
        if(!id || isNaN(id)){
            return {success: false, message: "Invalid product id."}
        }
        // console.log(id,`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`)
        const raw =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`)
        const data = await raw.json()
        return data
    }catch(err){
        return {success: false, message: err.message}
    }
    
}