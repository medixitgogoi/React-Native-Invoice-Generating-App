import { useNavigation } from '@react-navigation/native';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { modalBackColor, zomatoRed } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import PinchZoomView from 'react-native-pinch-zoom-view';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { useSelector } from 'react-redux';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const DispatchOrderDetails = (route) => {

    const navigation = useNavigation();

    const details = route?.route?.params?.data;
    console.log('details', details);

    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    const [name, setName] = useState('');
    const [site, setSite] = useState('');
    const [pan, setPan] = useState('');
    const [contact, setContact] = useState('');
    const [gstin, setGstin] = useState('');

    const userDetails = useSelector(state => state.user);
    const loginDetails = useSelector(state => state.login);
    const billDetails = useSelector(state => state.bill);

    useEffect(() => {
        userDetails.map(user => {
            setName(user.name)
            setSite(user.site)
            setPan(user.pan)
            setContact(user.contact)
            setGstin(user.gstin)
        })
    }, []);

    const NoOfItems = () => {
        let items = 0;
        details?.orderDetails?.map(item => {
            let num = item.orderData.length;
            items += num;
        })
        return items;
    };

    const getTotal = () => {
        let total = 0; // Use let instead of const

        details?.orderDetails?.forEach(item => {
            const totalQuantity = item?.orderData?.reduce((sum, lp) => sum + (parseInt(lp.quantity) * parseInt(lp.length)), 0);
            const totalAmount = totalQuantity * parseInt(item.rate);
            total += totalAmount;
        });

        total = indianNumberFormat(total + parseInt(details.bend_charge) + parseInt(details.loading_charge) + parseInt(details.transport_charge)); // Format the total amount

        return total;
    };

    const generateHtmlContent = () => {
        const rows = details?.orderDetails?.map(detail => {
            const lengths = detail.orderData.map((lp, index) => `
                <tr style="width: 100%; margin: 0; ">
                    <td style="padding: 3px; text-align: center; width: 20%; margin: 0;  ">
                    <p style="margin: 0; font-weight: 700; font-size: 12px; "><u>${index === 0 ? 'Colour: ' : ''} ${index === 0 ? detail.color : ''}</u></p>
                    <p style="margin: 0; font-weight: 700; font-size: 12px; "><u>${index === 0 ? detail.product_type : ''}</u></p>
                    </td>
                    <td style="border: 1px solid black; padding: 3px; text-align: center; width: 20%; margin: 0; font-size: 12px; font-weight: 600; ">${detail.thickness} mm</td>
                    <td style="border: 1px solid black; padding: 3px; text-align: center; width: 20%; margin: 0; font-size: 12px; font-weight: 600; ">${detail.product_type === 'Ridges' ? `${detail.ridge_width} inch` : '3.5 mm'}</td>
                    <td style="border: 1px solid black; padding: 3px; text-align: center; width: 20%; margin: 0; font-size: 12px; font-weight: 600; ">${lp.length} ${detail.unit}</td>
                    <td style="border: 1px solid black; padding: 3px; text-align: center; width: 20%; margin: 0; font-size: 12px; font-weight: 600; ">${lp.quantity}</td>
                </tr>
            `).join('');

            // Calculate the total number of pieces for each detail
            const totalPieces = detail.orderData.reduce((sum, lp) => sum + parseInt(lp.quantity), 0);

            return `
                ${lengths}
                <tr>
                <td style="padding: 3px; "></td>
                <td style="padding: 3px; background-color: #a2eaf3; border: 1px solid black; "></td>
                <td style="padding: 3px; background-color: #a2eaf3; border: 1px solid black; "></td>
                <td colspan="1" style="background-color: #a2eaf3; padding: 3px; border: 1px solid black; text-align: right; font-weight: 600; text-align: center; font-size: 13px;">Total</td>
                <td style="background-color: #a2eaf3; border: 1px solid black; padding: 3px; text-align: center; font-weight: 700; font-size: 13px;">${totalPieces}</td>
                </tr>
            `;
        }).join('');

        return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=yes">
            <style>

              @page {
                margin-top: 15px;
                margin-bottom: 15px;
              }
            
            </style>
          </head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <div style="margin: 0; ">
              
              <div style="text-align: center; font-size: 19px; font-weight: bold; color: #1bb3c7; margin-bottom: 2px; "><u>POOJA ROOFING CO. (MFG)</u></div>
              <div style="text-align: center; font-size: 13px; margin-bottom: 15px; ">LOKHRA - LALGANESH ROAD, GUWAHATI - 781034, ASSAM</div>
              <div style="text-align: center; font-size: 16px; margin-bottom: 5px; font-weight: 600;"><u>GST NO: 18AAZFP3190K1ZD</u></div>
              
              <div style="flex-direction: row; justify-content: space-between; display: flex; margin-bottom: 10px;">
                <div style="text-align: center; font-size: 12px; font-weight: 600; ">REF: DO/24-25/077</div>
                <div style="text-align: center; font-size: 12px; font-weight: 600; "><u>${formattedDate}</u></div>
              </div>
              
              <div style="text-align: center; font-size: 18px; margin-bottom: 15px; font-weight: 700; "><u>DISPATCH ORDER</u></div>
              <div style="text-align: center; font-size: 18px; margin-bottom: 5px; font-weight: 700;">PARTY: ${name}</div>
              
              <table style="width: 100%; border-collapse: collapse; ">
                <thead>
                  <tr style="width: 100%; ">
                    <th style="padding: 5px; text-align: center; width: 20%; "></th>
                    <th style="border: 1px solid black; padding: 5px; text-align: center; width: 20%; font-size: 12px; background-color: #7ff460; ">THICKNESS</th>
                    <th style="border: 1px solid black; padding: 5px; text-align: center; width: 20%; font-size: 12px; background-color: #7ff460; ">WIDTH</th>
                    <th style="border: 1px solid black; padding: 5px; text-align: center; width: 20%; font-size: 12px; background-color: #7ff460; ">LENGTH</th>
                    <th style="border: 1px solid black; padding: 5px; text-align: center; width: 20%; font-size: 12px; background-color: #7ff460; ">PC</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
              
              <div style="font-size: 14px; margin-top: 10px; ${NoOfItems() > 24 ? `page-break-before: always;` : ``} ">
                <p style="background-color: yellow; margin: 0; font-size: 12px; font-weight: 600; ">1. Pooja Roofing CO. MFG & 0.40mm/0.45mm Thickness to be Printed.</p>
                <p style="font-size: 12px; margin: 0; margin-top: 3px; font-weight: 600; ">2. REGARDING ANY ISSUE IN MEASUREMENT PLEASE CONTACT 6901262103</p>
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-around; margin-top: 30px; margin-bottom: 10px;  ">
                  <div style="display: flex; flex-direction: column; align-items: center; ">
                    <p style="margin: 0; font-size: 12px; font-weight: 500; ">Prepared By </p>
                    <p style="margin: 0; font-size: 12px; font-weight: 500; margin-top: 3px; ">(A.B.)</p>
                  </div>
                  <p style="margin: 0; font-size: 12px; font-weight: 500; ">Checked By </p>
                  <div style="display: flex; flex-direction: column; align-items: center; ">
                    <p style="margin: 0; font-size: 12px; font-weight: 500; ">Approved By </p>
                    <p style="margin: 0; font-size: 12px; font-weight: 500; margin-top: 3px; ">(${loginDetails[0].name})</p>
                  </div>               
                </div>
                <p style="margin: 0; font-size: 12px; margin-top: 3px; font-weight: 600; ">Dispatch Date:- </p>
                <p style="margin: 0; font-size: 12px; margin-top: 3px; font-weight: 600; ">Order By:- P. Chakraborty </p>
                <p style="margin: 0; font-size: 12px; margin-top: 3px; font-weight: 600; ">Material weight=</p>
                <p style="margin: 0; font-size: 12px; margin-top: 3px; font-weight: 600; ">Advance Payment=</p>
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; margin: 0; margin-top: 3px; font-weight: 600;">
                  <p style="color: black; margin: 0; font-size: 12px; ">Total Payment= ₹${getTotal()}.00</p>
                  <p style="color: black; margin: 0; font-size: 12px; ">Receipt No: </p>
                </div>
              </div>
            
            </div>
          </body>
        </html>
    `;
    };

    const htmlContent = generateHtmlContent();

    const generateInvoice = async () => {

        try {
            // Generate PDF
            const pdfOptions = {
                html: htmlContent,
                fileName: 'ColourTuff_DO',
                directory: 'Documents',
            };

            const pdf = await RNHTMLtoPDF.convert(pdfOptions);
            const pdfPath = pdf.filePath;

            console.log(pdfPath);

            // Share the PDF
            const shareOptions = {
                title: 'Share Invoice',
                url: `file://${pdfPath}`,
                type: 'application/pdf',
                saveToFiles: true,
            };

            await Share.open(shareOptions);
        } catch (error) {
            console.error(error);
        }
    };

    function indianNumberFormat(number) {
        // Split the number into an array of digits.
        const digits = number.toString().split('');

        // Reverse the array of digits.
        digits.reverse();

        // Add a comma after every three digits, starting from the right.
        for (let i = 3; i < digits.length; i += 3) {
            digits.splice(i, 0, ',');
        }

        // Join the array of digits back into a string.
        const formattedNumber = digits.join('');

        // Reverse the formatted number back to its original order.
        return formattedNumber.split('').reverse().join('');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />

            {/* header */}
            <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>
                    <View style={{ paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-arrow-left" size={27} color={zomatoRed} />
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>View Order Details</Text>
                    </View>
                    <TouchableOpacity style={{ paddingHorizontal: 5, backgroundColor: modalBackColor, paddingVertical: 5, borderRadius: 50, elevation: 1, marginRight: 15 }} onPress={generateInvoice}>
                        <Icon3 name="share-social" size={20} color={zomatoRed} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content */}
            <ScrollView>
                <PinchZoomView style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingBottom: 40 }}>

                    <View style={{ height: '100%', backgroundColor: '#fff', width: '100%', padding: 12 }}>
                        <View style={{ padding: 2 }}>

                            {/* First para */}
                            <View>
                                <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', textAlign: 'center', color: '#1bb3c7', textDecorationLine: 'underline' }}>POOJA ROOFING CO. (MFG)</Text>
                                <Text style={{ fontSize: responsiveFontSize(1.1), textAlign: 'center', color: '#000' }}>LOKHRA - LALGANESH ROAD , GUWAHATI - 781034 , ASSAM</Text>
                                <Text style={{ fontSize: responsiveFontSize(1.4), textAlign: 'center', color: '#000', marginTop: 7, textDecorationLine: 'underline' }}>GST NO: 18AAZFP3190K1ZD</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.2), textAlign: 'left', marginVertical: 4, color: '#000', fontWeight: '700' }}>REF: DO/24-25/077</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.2), textAlign: 'right', marginVertical: 4, color: '#000', textDecorationLine: 'underline', fontWeight: '500' }}>{formattedDate}</Text>
                                </View>
                                <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: 'bold', textAlign: 'center', marginTop: 3, marginBottom: 3, color: '#000', textDecorationLine: 'underline' }}>DISPATCH ORDER</Text>
                                <Text style={{ fontSize: responsiveFontSize(1.7), textAlign: 'center', marginVertical: 6, color: '#000', fontWeight: '700', textDecorationLine: 'underline' }}>PARTY: {name}</Text>
                            </View>

                            {/* Second para */}
                            <View style={{ marginVertical: 4, borderColor: '#000', borderWidth: 1 }}>
                                {details?.orderDetails?.map((data, index) => (
                                    <View style={{ width: '100%', flexDirection: 'column' }} key={details?.id}>

                                        <View style={{ width: '100%', flexDirection: 'row' }}>

                                            <View style={{ flexDirection: 'column', width: '20%', borderWidth: 0.5, borderColor: '#000', borderBottomWidth: 1, }}>
                                                <Text style={{ fontSize: responsiveFontSize(1), fontWeight: '500', color: '#000', textAlign: 'center', textDecorationLine: 'underline' }}>Colour: {data.color}</Text>
                                                <Text style={{ fontSize: responsiveFontSize(1), fontWeight: '500', color: '#000', textAlign: 'center', textDecorationLine: 'underline', marginBottom: 1 }}>{data.product_type}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderWidth: 0.5, borderColor: '#000', width: '80%' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, borderRightWidth: 1, borderColor: '#000', justifyContent: 'center', width: '20%', borderBottomWidth: 1, }}>
                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1), fontWeight: '500' }}>THICKNESS</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, borderRightWidth: 1, borderColor: '#000', justifyContent: 'center', width: '20%' }}>
                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1), fontWeight: '500' }}>WIDTH</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, borderRightWidth: 1, borderColor: '#000', justifyContent: 'center', width: '20%' }}>
                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1), fontWeight: '500' }}>LENGTH</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, borderRightWidth: 0.5, borderColor: '#000', justifyContent: 'center', width: '20%' }}>
                                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(1), fontWeight: '500' }}>PC</Text>
                                                </View>
                                            </View>

                                        </View>

                                        <View>
                                            {data.orderData.map((item, index) => (
                                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                                                    <View style={{ width: '20%', }}>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                                        <Text style={{ borderRightWidth: 1, borderTopWidth: 0.5, borderLeftWidth: 1, borderBottomWidth: 0.5, borderColor: '#000', textAlign: 'center', color: '#000', width: '25%', fontSize: responsiveFontSize(1.1), fontWeight: '500', height: '100%' }}>{data.thickness} mm</Text>
                                                        <Text style={{ borderRightWidth: 1, borderTopWidth: 0.5, borderLeftWidth: 1, borderBottomWidth: 0.5, borderColor: '#000', textAlign: 'center', color: '#000', width: '25%', fontSize: responsiveFontSize(1.1), fontWeight: '500', height: '100%' }}>{data.product_type === 'Ridges' ? `${data.ridge_width} inch` : data.width}</Text>
                                                        <Text style={{ borderRightWidth: 1, borderTopWidth: 0.5, borderLeftWidth: 1, borderBottomWidth: 0.5, borderColor: '#000', textAlign: 'center', color: '#000', width: '25%', fontSize: responsiveFontSize(1.1), fontWeight: '500', height: '100%' }}>{item.length} {data.unit}</Text>
                                                        <Text style={{ textAlign: 'center', color: '#000', width: '25%', borderRightWidth: 1, borderTopWidth: 0.5, borderLeftWidth: 1, borderBottomWidth: 0.5, borderColor: '#000', fontSize: responsiveFontSize(1.1), fontWeight: '500' }}>{item.quantity}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#a2eaf3' }}>
                                            <View style={{ width: '60%', borderColor: '#000', borderWidth: 1, borderBottomWidth: 0.5, borderRightWidth: 0.5, borderLeftWidth: 0, }}>
                                                <Text></Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: '#000', borderWidth: 0.5, width: '20%', }}>
                                                <Text style={{ textAlign: 'right', color: '#000', fontSize: responsiveFontSize(1.2), fontWeight: '500' }}>Total</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: '#000', borderWidth: 0.5, width: '20%', }}>
                                                <Text style={{ textAlign: 'right', color: '#000', fontSize: responsiveFontSize(1.2), textAlign: 'center', fontWeight: '600' }}>
                                                    {data.orderData.reduce((sum, item) => sum + parseInt(item.quantity), 0)}
                                                </Text>
                                            </View>
                                        </View>

                                    </View>
                                ))}
                            </View>

                            {/* Third para */}
                            <View>
                                <Text style={{ fontSize: responsiveFontSize(1.2), marginBottom: 1, fontWeight: '700', color: '#000', backgroundColor: 'yellow' }}>1. Pooja Roofing CO. MFG & 0.40mm/0.45mm Thickness to be Printed.</Text>
                                <Text style={{ fontSize: responsiveFontSize(1.1), fontWeight: '700', color: '#000', }}>2. REGARDING ANY ISSUE IN MEASUREMENT PLEASE CONTACT 6901262103</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                                    <View>
                                        <Text style={{ fontSize: responsiveFontSize(1.2), textAlign: 'center', color: '#000' }}>Prepared By</Text>
                                        <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: 'bold', textAlign: 'center', color: '#000' }}>( A.B )</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: responsiveFontSize(1.2), textAlign: 'center', color: '#000' }}>Checked By</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: responsiveFontSize(1.2), textAlign: 'center', color: '#000' }}>Approved By</Text>
                                        <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: 'bold', textAlign: 'center', color: '#000' }}>( {loginDetails[0].name} )</Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', marginBottom: 1, fontWeight: '700', marginTop: 5 }}>Dispatch Date:-</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', marginBottom: 1, fontWeight: '700' }}>Order By:- P. Chakraborty</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', marginBottom: 1, fontWeight: '700' }}>Material weight= </Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', marginBottom: 1, fontWeight: '700' }}>Advance Payment= </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: 'bold', color: '#000', marginBottom: 1, fontWeight: '700' }}>Total Payment = ₹{details?.payble_amount}.00</Text>
                                        <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', fontWeight: '700' }}>Receipt No:- </Text>
                                    </View>
                                </View>

                            </View>

                        </View>
                    </View>

                </PinchZoomView>
            </ScrollView>

        </SafeAreaView>
    )
}

export default DispatchOrderDetails;

const styles = StyleSheet.create({})
