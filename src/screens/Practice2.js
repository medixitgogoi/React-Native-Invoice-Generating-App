import { StyleSheet, Text, View } from 'react-native';

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

    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default Practice2

const styles = StyleSheet.create({})
