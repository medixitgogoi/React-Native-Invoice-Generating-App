// const handleSubmit = async () => {
//     setload(true)
//     try {
//         axios.defaults.headers.common[
//             'Authorization'
//         ] = `Bearer ${result?.access_token}`;
//         const formData = new FormData();
//         formData.append('f_name', firstname && firstname);
//         formData.append('l_name', lastname && lastname);
//         formData.append('dob', startdate && startdate);
//         formData.append('birth_time"', selectTime && selectTime);
//         formData.append('gender', selectedId && selectedId);

//         console.log('formData', formData)
//         console.log('photo && photo ', photo && photo.uri)

//         const response = await axios.post('/user/profile/update', formData, {
//             headers: {
//                 'content-type': 'multipart/form-data',
//             },
//         });
//         console.log('Response2222:', response);
//         console.log('Response:', response.data);
//         if (response.data.error_code == true) {
//             setload(false)
//             seterrormsg(response.data.error_message)
//         } else {
//             setload(false)
//             Toast()
//             navigation.navigate("Dashboard")
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// <View style={{ width: '100%', borderRadius: 6, flexDirection: 'column', borderColor: '#6f8990', borderWidth: 0.5, overflow: 'hidden', backgroundColor: '#fff' }}>

//     {/* Top */}
//     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#edf5fa', padding: 12, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, }}>
//         <View style={{ flexDirection: 'column', }}>
//             <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600', textTransform: 'uppercase' }}>Dixit Gogoi</Text>
//             <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Ganeshguri, Guwahati</Text>
//         </View>
//         <View>
//             <View style={{ backgroundColor: lightZomatoRed, padding: 5, borderRadius: 5, elevation: 1, borderColor: zomatoRed, borderWidth: 0.6 }}>
//                 <Text style={{ color: zomatoRed, fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>To be dispatched</Text>
//             </View>
//         </View>
//     </View>

//     {/* Bottom */}
//     <View style={{ padding: 12 }}>

//         {/* Products */}
//         <View style={{ flexDirection: 'column', gap: 5, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, borderStyle: 'dashed', paddingBottom: 10 }}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
//                 <Text style={{ color: '#6f8990', fontWeight: '600' }}>125 x</Text>
//                 <Text style={{ color: '#000', fontWeight: '500' }}>Ridges</Text>
//                 <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
//                 <Text style={{ color: '#000', fontWeight: '500' }}>Green</Text>
//             </View>
//             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
//                 <Text style={{ color: '#6f8990', fontWeight: '600' }}>450 x</Text>
//                 <Text style={{ color: '#000', fontWeight: '500' }}>Tiles Profile Sheet</Text>
//                 <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
//                 <Text style={{ color: '#000', fontWeight: '500' }}>Red</Text>
//             </View>
//             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
//                 <Text style={{ color: '#6f8990', fontWeight: '600' }}>260 x</Text>
//                 <Text style={{ color: '#000', fontWeight: '500' }}>Profile Sheet</Text>
//                 <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
//                 <Text style={{ color: '#000', fontWeight: '500' }}>Blue</Text>
//             </View>
//             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
//                 <Text style={{ color: '#6f8990', fontWeight: '600' }}>380 x</Text>
//                 <Text style={{ color: '#000', fontWeight: '500' }}>Tiles Profile Sheet</Text>
//                 <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
//                 <Text style={{ color: '#000', fontWeight: '500' }}>Green</Text>
//             </View>
//         </View>

//         {/* Date and Amount */}
//         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
//             <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.7) }}>03 June 2024</Text>
//             <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>₹{indianNumberFormat(78000)}</Text>
//         </View>

//         {/* View Order Button */}
//         <TouchableOpacity style={{ backgroundColor: zomatoRed, borderRadius: 6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 8, gap: 5 }} onPress={viewOrderHandler}>
//             <View style={{ backgroundColor: lightZomatoRed, borderRadius: 5, width: 22, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//                 <Icon2 name="receipt-outline" size={14} color={zomatoRed} />
//             </View>
//             <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '500', textTransform: 'uppercase' }}>View Order</Text>
//         </TouchableOpacity>

//     </View>

// </View>

const passwordSubmit = async () => {
    setpasswordload(true)
    try {
        // setverifyload(true)
        const result = await axios
            .post(
                /api/v1 / reset - password,
                {
                    email: email && email,
                    password: password,
                    // password: password, email: email 
                },
            )
            .then(res => {
                setpasswordload(false)
                navigation.navigate("Login")

                // setverifyotp("")
                // setemail("")
                setpassword("")
                console.log(res, 'login data');
                Toast()
            });
        console.log(result);
    } catch (error) {
        if (error.response.data.err == true) {
            setpasswordload(false)
            seterrorpass(error.response.data.message)

        }
        console.log(error);
    }
};