import { StyleSheet, Text, View } from 'react-native';

const arr =
    [
        {
            "color": "Red",
            "id": "1717652712149jzltw7h",
            "lengthAndPieces": [
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                }
            ],
            "rate": "12",
            "thickness": "0.30 mm",
            "type": "Profile Sheet",
            "unit": "mm",
            "width": "3.5 mm",
        },
        {
            "color": "Red",
            "id": "1717652712149jzltw7h",
            "lengthAndPieces": [
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                }
            ],
            "rate": "12",
            "thickness": "0.30 mm",
            "type": "Profile Sheet",
            "unit": "mm",
            "width": "3.5 mm",
        },
        {
            "color": "Red",
            "id": "1717652712149jzltw7h",
            "lengthAndPieces": [
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                }
            ],
            "rate": "12",
            "thickness": "0.30 mm",
            "type": "Profile Sheet",
            "unit": "mm",
            "width": "3.5 mm",
        },
    ]

const Practice2 = () => {

    const generateTableRows = () => {
        return `
            <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 2px;">
                ${billDetails.map((item, itemIndex) => {
                    // Calculate totals for this item
                    const totalPieces = item.lengthAndPieces.reduce((sum, lp) => sum + lp.pieces, 0);
                    const totalQuantity = item.lengthAndPieces.reduce((sum, lp) => sum + (lp.pieces * lp.length), 0).toFixed(2);
                    // You can calculate the total amount as needed
                    const totalAmount = (totalQuantity * item.pricePerUnit).toFixed(2); // Example calculation, adjust as needed

                    return `
                ${item.lengthAndPieces.map((lp, lpIndex) => `
                    <tr key="${itemIndex}-${lpIndex}" style="height: 30px; text-align: center;">
                    ${lpIndex === 0 ? `
                        <td style="font-size: 10px; width: 23%; padding: 0; border-top: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                        <p style="margin: 0; font-weight: 500; font-size: 12px; margin-bottom: 2px;"><u>Colour: ${item.color}</u></p>
                        <u style="margin: 0; font-weight: 500; font-size: 12px;">${item.type}</u>
                        </td>
                    ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                        <td style="font-size: 10px; width: 23%; padding: 10px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;"></td>
                    ` : `
                        <td style="font-size: 10px; width: 23%; padding: 10px; border-right: 0.5px solid black; border-left: 0.5px solid black;"></td>
                    `}
                    <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px;">
                        <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.thickness}</p>
                    </td>
                    <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 6px;">
                        <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.width}</p>
                    </td>
                    <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 0;">
                        <p style="margin: 0; font-weight: 500; font-size: 11px;">${lp.length} ${item.unit}</p>
                    </td>
                    <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 0;">
                        <p style="margin: 0; font-weight: 500;">${lp.pieces}</p>
                    </td>
                    <td style="font-size: 10px; border: 0.5px solid black; width: 15%; padding: 0;">
                        <div style="display: flex; height: 35px;">
                        <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
                            <p style="margin: 0; font-weight: 500;">${(lp.pieces * lp.length).toFixed(2)}</p>
                        </div>
                        <div style="width: 1px; background-color: black; height: 100%;"></div>
                        <div style="width: 35%; display: flex; align-items: center; justify-content: center; padding: 0;"></div>
                        </div>
                    </td>
                    ${lpIndex === 0 ? `
                        <td style="font-size: 10px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 0;"></td>
                    ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                        <td style="font-size: 10px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 0;"></td>
                    ` : `
                        <td style="font-size: 10px; border-right: 0.5px solid black; width: 17%; padding: 0;"></td>
                    `}
                    ${lpIndex === 0 ? `
                        <td style="font-size: 10.3px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 13%; padding: 10px;"></td>
                    ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                        <td style="font-size: 10.3px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 13%; padding: 10px;"></td>
                    ` : `
                        <td style="font-size: 10.3px; border-right: 0.5px solid black; width: 13%; padding: 10px;"></td>
                    `}
                    </tr>
                `).join('')}
                <tr style="height: 30px; text-align: center;">
                    <td style="font-size: 10px; width: 23%; padding: 0; border: 0.5px solid black;">Total</td>
                    <td colspan="3" style="font-size: 10px; border: 0.5px solid black;"></td>
                    <td style="font-size: 10px; border: 0.5px solid black;">${totalPieces}</td>
                    <td style="font-size: 10px; border: 0.5px solid black;">${totalQuantity}</td>
                    <td colspan="2" style="font-size: 10px; border: 0.5px solid black;">${totalAmount}</td>
                </tr>
                `;
                }).join('')}
            </table>
        `;
    };

    const generateTableRows2 = () => {
        return billDetails.map((item, index) => `
      <div key=${index} style="flexDirection: row; alignItems: center; alignSelf: center;">
        
        <div style="flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 23%; alignItems: center; padding-top: 1px; padding-bottom: 1px; height: 30px; justifyContent: center; ">
          <p style="fontSize: 6px; margin: 0; fontWeight: 500;"><u>Colour: ${item.color}</u></p>
          <u style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.type}</u>
        </div>

        <div style="flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; padding-top: 1px; padding-bottom: 1px; height: 30px; justifyContent: center; " >
          <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.thickness}</p >
        </div >

        <div style="flexDirection: column; font-size: 6px; border: 0.5px solid black; alignItems: center; width: 8%; padding-top: 1px; padding-bottom: 1px; height: 30px; justifyContent: center; " >
          <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.width}</p>
        </div>
      
        <div style="flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; height: 30px; justifyContent: center;">
          <div style="flexDirection: column; font-size: 6px; width: 100%; borderBottom: 0.5px solid black; alignItems: center; height: 15px; justifyContent: center; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.length} ${item.unit}</p>
          </div>         
          <div style="width: 100%; backgroundColor: black; height: 1px;"></div>
          <div style="flexDirection: column; font-size: 6px; width: 100%; alignItems: center; height: 15px; justifyContent: center; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">Total</p>
          </div>         
        </div>
        
        <div style="flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; height: 30px; justifyContent: center;">
          <div style="flexDirection: column; font-size: 6px; width: 100%; borderBottom: 0.5px solid black; alignItems: center; height: 15px; justifyContent: center; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.pieces}</p>
          </div>         
          <div style="width: 100%; backgroundColor: black; height: 1px;"></div>
          <div style="flexDirection: column; font-size: 6px; width: 100%; alignItems: center; height: 15px; justifyContent: center; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.pieces}</p>
          </div>         
        </div>
        
        <div style="flexDirection: column; font-size: 6px; width: 15%; border: 0.5px solid black; alignItems: center; padding-top: 4.9px; padding-bottom: 4.9px; height: 30px; justifyContent: center; ">
          <div style="flexDirection: column; font-size: 6px; width: 100%; borderBottom: 0.5px solid black; alignItems: center; height: 15px; justifyContent: center; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.pieces * item.length}.00</p>
          </div>         
          <div style="width: 100%; backgroundColor: black; height: 1px;"></div>

          <div style="flexDirection: row; alignItems: center; width: 100%">
            <div style="flexDirection: column; font-size: 6px; width: 65%; alignItems: center; height: 15px; justifyContent: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.pieces * item.length}.00</p>
            </div>   
            <div style="backgroundColor: black; height: 99%; width: 1px;"></div>
            <div style="flexDirection: column; font-size: 6px; width: 35%; alignItems: center; height: 15px; justifyContent: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500; fontWeight: 600;">Rft</p>
            </div>
          </div>
        
        </div>
        
        <div style="flexDirection: column; font-size: 6px; width: 17%;border: 0.5px solid black; alignItems: center;  padding-top: 1px; padding-bottom: 1px; height: 30px; justifyContent: center; ">
        
          <div style="flexDirection: column; font-size: 6px; width: 100%; borderBottom: 0.5px solid black; alignItems: center; height: 15px; justifyContent: center; ">
            <div style="flexDirection: column; font-size: 6px; alignItems: center; height: 15px; justifyContent: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500; fontWeight: 600;">Per Rft</p>
            </div>
          </div>         
        
          <div style="width: 100%; backgroundColor: black; height: 1px;"></div>

          <div style="flexDirection: row; alignItems: center; width: 100%">
            <div style="flexDirection: column; font-size: 6px; width: 20%; alignItems: center; height: 15px; justifyContent: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500;">₹</p>
            </div>
            <div style="backgroundColor: black; height: 99%; width: 1px;"></div>
            <div style="flexDirection: column; font-size: 6px; width: 80%; alignItems: center; height: 15px; justifyContent: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 600;">${item.rate}.00</p>
            </div>   
          </div>

        </div>
        
        <div style="flexDirection: column; font-size: 6px; width: 13%; border: 0.5px solid black;alignItems: center;  padding-top: 1px; padding-bottom: 1px; height: 30px; justifyContent: center; ">
          <p style="fontSize: 6.3px; margin: 0; fontWeight: 600;">₹${indianNumberFormat(item.length * item.pieces * item.rate)}.00</p>
        </div>

      </div >
  `).join('');
    };

    // <p style="fontSize: 6px; margin: 0; fontWeight: 500;"></p>

    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default Practice2

const styles = StyleSheet.create({})

    // <td td style = "font-size: 10px; border: 0.5px solid black; width: 14%; padding: 3px; " >
    //     <div style="display: flex; ">
    //         <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
    //             <p style="margin: 0; font-weight: 500;">${lp.pieces * lp.length}.00</p>
    //         </div>
    //         <div style="width: 1px; background-color: black; height: 100%;"></div>
    //         <div style="width: 35%; display: flex; align-items: center; justify-content: center; padding: 0; ">
    //             <p style="margin: 0; font-weight: 600;"></p>
    //         </div>
    //     </div>
    // </td>