const handleSubmit = async () => {
    setload(true)
    try {
        axios.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${result?.access_token}`;
        const formData = new FormData();
        formData.append('f_name', firstname && firstname);
        formData.append('l_name', lastname && lastname);
        formData.append('dob', startdate && startdate);
        formData.append('birth_time"', selectTime && selectTime);
        formData.append('gender', selectedId && selectedId);

        console.log('formData', formData)
        console.log('photo && photo ', photo && photo.uri)

        const response = await axios.post('/user/profile/update', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        console.log('Response2222:', response);
        console.log('Response:', response.data);
        if (response.data.error_code == true) {
            setload(false)
            seterrormsg(response.data.error_message)
        } else {
            setload(false)
            Toast()
            navigation.navigate("Dashboard")
        }
    } catch (error) {
        console.error('Error:', error);
    }
};