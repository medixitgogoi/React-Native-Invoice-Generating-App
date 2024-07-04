import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import PinchZoomView from 'react-native-pinch-zoom-view';
import { useEffect, useState } from 'react';
import { lightZomatoRed, zomatoRed } from '../utils/colors';

const DispatchOrderView = ({ bendCharge, loadingCharge, transportCharge }) => {

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
    billDetails.map(item => {
      let num = item.lengthAndPieces.length;
      items += num;
    })
    return items;
  };

  const getTotal = () => {
    let total = 0; // Use let instead of const

    billDetails.forEach(item => {
      const totalQuantity = item.lengthAndPieces.reduce((sum, lp) => sum + (lp.pieces * lp.length), 0);
      const totalAmount = totalQuantity * item.rate;
      total += totalAmount;
    });

    total = indianNumberFormat(total + parseInt(loadingCharge) + parseInt(bendCharge) + parseInt(transportCharge)); // Format the total amount
    // return total + parseInt(loadingCharge) + parseInt(bendCharge) + parseInt(transportCharge);
    return total;
  };

  const generateHtmlContent = () => {
    const rows = billDetails.map(detail => {
      const lengths = detail.lengthAndPieces.map((lp, index) => `
      <tr style="width: 100%; margin: 0; ">
        <td style="padding: 3px; text-align: center; width: 20%; margin: 0;  ">
          <p style="margin: 0; font-weight: 700; font-size: 12px; "><u>${index === 0 ? 'Colour: ' : ''} ${index === 0 ? detail.color.name : ''}</u></p>
          <p style="margin: 0; font-weight: 700; font-size: 12px; "><u>${index === 0 ? detail.type.name : ''}</u></p>
        </td>
        <td style="border: 1px solid black; padding: 3px; text-align: center; width: 20%; margin: 0; font-size: 12px; font-weight: 600; ">${detail.thickness.name}</td>
        <td style="border: 1px solid black; padding: 3px; text-align: center; width: 20%; margin: 0; font-size: 12px; font-weight: 600; ">${detail.type.name === 'Ridges' ? `${detail.width.name} inch` : detail.width}</td>
        <td style="border: 1px solid black; padding: 3px; text-align: center; width: 20%; margin: 0; font-size: 12px; font-weight: 600; ">${lp.length} ${detail.unit.name}</td>
        <td style="border: 1px solid black; padding: 3px; text-align: center; width: 20%; margin: 0; font-size: 12px; font-weight: 600; ">${lp.pieces}</td>
      </tr>
    `).join('');

      // Calculate the total number of pieces for each detail
      const totalPieces = detail.lengthAndPieces.reduce((sum, lp) => sum + parseInt(lp.pieces), 0);

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
                  <p style="color: black; margin: 0; font-size: 12px; ">Total Payment= ${getTotal()}.00</p>
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
    <View>
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
                {billDetails.map((data) => (
                  <View style={{ width: '100%', flexDirection: 'column' }} key={data.id}>

                    <View style={{ width: '100%', flexDirection: 'row' }}>

                      <View style={{ flexDirection: 'column', width: '20%', borderWidth: 0.5, borderColor: '#000', borderBottomWidth: 1, }}>
                        <Text style={{ fontSize: responsiveFontSize(1), fontWeight: '500', color: '#000', textAlign: 'center', textDecorationLine: 'underline' }}>Colour: {data.color.name}</Text>
                        <Text style={{ fontSize: responsiveFontSize(1), fontWeight: '500', color: '#000', textAlign: 'center', textDecorationLine: 'underline', marginBottom: 1 }}>{data.type.name}</Text>
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
                      {data.lengthAndPieces.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                          <View style={{ width: '20%', }}>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                            <Text style={{ borderRightWidth: 1, borderTopWidth: 0.5, borderLeftWidth: 1, borderBottomWidth: 0.5, borderColor: '#000', textAlign: 'center', color: '#000', width: '25%', fontSize: responsiveFontSize(1.1), fontWeight: '500', height: '100%' }}>{data.thickness.name}</Text>
                            <Text style={{ borderRightWidth: 1, borderTopWidth: 0.5, borderLeftWidth: 1, borderBottomWidth: 0.5, borderColor: '#000', textAlign: 'center', color: '#000', width: '25%', fontSize: responsiveFontSize(1.1), fontWeight: '500', height: '100%' }}>{data.type.name === 'Ridges' ? `${data.width.name} inch` : data.width}</Text>
                            <Text style={{ borderRightWidth: 1, borderTopWidth: 0.5, borderLeftWidth: 1, borderBottomWidth: 0.5, borderColor: '#000', textAlign: 'center', color: '#000', width: '25%', fontSize: responsiveFontSize(1.1), fontWeight: '500', height: '100%' }}>{item.length} {data.unit.name}</Text>
                            <Text style={{ textAlign: 'center', color: '#000', width: '25%', borderRightWidth: 1, borderTopWidth: 0.5, borderLeftWidth: 1, borderBottomWidth: 0.5, borderColor: '#000', fontSize: responsiveFontSize(1.1), fontWeight: '500' }}>{item.pieces}</Text>
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
                          {data.lengthAndPieces.reduce((sum, item) => sum + parseInt(item.pieces), 0)}
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
                    <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: 'bold', color: '#000', marginBottom: 1, fontWeight: '700' }}>Total Payment = {getTotal()}.00</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', fontWeight: '700' }}>Receipt No:- </Text>
                  </View>
                </View>

              </View>

            </View>
          </View>

        </PinchZoomView>
      </ScrollView>

      {/* Share button */}
      <TouchableOpacity style={{ marginTop: 10, backgroundColor: zomatoRed, width: '100%', borderRadius: 8, padding: 6, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40, gap: 5 }} onPress={generateInvoice}>
        <View style={{ backgroundColor: lightZomatoRed, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 1, height: 22, width: 22 }}>
          <Icon2 name="share" size={13} color={zomatoRed} />
        </View>
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: responsiveFontSize(2.1), textTransform: 'uppercase' }}>Share PDF</Text>
      </TouchableOpacity>

    </View>
  )
}

export default DispatchOrderView;

const styles = StyleSheet.create({});