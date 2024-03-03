
const Fetch = async (input) => {

    try {
        const response = await fetch(
            `https://api.postalpincode.in/pincode/${input}`
        )
        const data = await response.json();
        console.log(input, data)
        return data;
    }

    catch (error) {
        console.log(error);
        throw error;
    }
}

export default Fetch