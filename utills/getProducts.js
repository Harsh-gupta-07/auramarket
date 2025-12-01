export async function getProducts(page = 1, filters = {}) {
    try {
        const params = new URLSearchParams();
        params.append('page', page);

        if (filters.categories && filters.categories.length > 0) {
            filters.categories.forEach(cat => params.append('categories', cat));
        }

        if (filters.priceRange) {
            if (filters.priceRange.min) params.append('minPrice', filters.priceRange.min);
            if (filters.priceRange.max) params.append('maxPrice', filters.priceRange.max);
        }

        if (filters.rating && filters.rating.length > 0) {
            const minRating = Math.min(...filters.rating);
            params.append('minRating', minRating);
        }

        if (filters.sort) {
            const sortMap = {
                'newest': 'id_desc',
                'price_asc': 'price_asc',
                'price_desc': 'price_desc',
                'rating': 'rating'
            };
            params.append('sortBy', sortMap[filters.sort] || filters.sort);
        }

        if (filters.keyword) {
            params.append('keyword', filters.keyword);
        }
        // console.log(params.toString())
        const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`)
        const response = await raw.json()
        return response
    } catch (err) {
        // console.log(err)
        return { success: false, message: err.message }
    }
}


export async function getTopRatedProducts() {
    try {
        const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/top-rated`)
        const response = await raw.json()
        return response
    } catch (err) {
        return { success: false, message: err.message }
    }
}
