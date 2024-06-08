// old one
// const generateTableRows = () => {
//   return `
//     <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 2px;">
//       ${billDetails.map((item, index) => `
//         <tr key=${index} style="height: 30px; text-align: center;">
//           <td style="font-size: 10px; border: 0.5px solid black; width: 23%; padding: 10px;">
//             <p style="margin: 0; font-weight: 500; font-size: 12px; margin-bottom: 2px; "><u>Colour: ${item.color}</u></p>
//             <u style="margin: 0; font-weight: 500; font-size: 12px;">${item.type}</u>
//           </td>
//           <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px; ">
//             <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.thickness}</p>
//           </td>
//           <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 6px; ">
//             <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.width}</p>
//           </td>
//           <td style="font-size: 10px; border: 0.5px solid black; width: 8%; vertical-align: top; padding: 0;">
//             <div style="border-bottom: 0.5px solid black; height: 35px; display: flex; align-items: center; justify-content: center; padding: 0;">
//               <p style="margin: 0; font-weight: 500; font-size: 11px;">${item.length} ${item.unit}</p>
//             </div>
//             <div style="height: 1px; background-color: black;"></div>
//             <div style="height: 35px; display: flex; align-items: center; justify-content: center; padding: 0;">
//               <p style="margin: 0; font-weight: 500;">Total</p>
//             </div>
//           </td>
//           <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 0; vertical-align: top; ">
//             <div style="border-bottom: 0.5px solid black; height: 35px; padding: 0; display: flex; align-items: center; justify-content: center;">
//               <p style="margin: 0; font-weight: 500;">${item.pieces}</p>
//             </div>
//             <div style="height: 1px; background-color: black;"></div>
//             <div style="height: 35px; display: flex; align-items: center; padding: 0; justify-content: center;">
//               <p style="margin: 0; font-weight: 500;">${item.pieces}</p>
//             </div>
//           </td>
//           <td style="font-size: 10px; border: 0.5px solid black; width: 15%; padding: 0; vertical-align: top;">
//             <div style="border-bottom: 0.5px solid black; height: 35px; display: flex; align-items: center; justify-content: center; padding: 0;">
//               <p style="margin: 0; font-weight: 500;">${item.pieces * item.length}</p>
//             </div>
//             <div style="height: 1px; background-color: black;"></div>
//             <div style="display: flex; height: 35px; ">
//               <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
//                 <p style="margin: 0; font-weight: 500;">${item.pieces * item.length}</p>
//               </div>
//               <div style="width: 1px; background-color: black; height: 100%;"></div>
//               <div style="width: 35%; display: flex; align-items: center; justify-content: center; padding: 0;">
//                 <p style="margin: 0; font-weight: 600;">Rft</p>
//               </div>
//             </div>
//           </td>
          // <td style="font-size: 10px; border: 0.5px solid black; width: 17%; padding: 0; vertical-align: top;">
          //   <div style="border-bottom: 0.5px solid black; height: 35px; padding: 0; display: flex; align-items: center; justify-content: center;">
          //     <p style="margin: 0; font-weight: 600;">Per Rft</p>
          //   </div>
          //   <div style="height: 1px; background-color: black;"></div>
          //   <div style="display: flex; height: 35px; ">
          //     <div style="width: 20%; display: flex; align-items: center; justify-content: center; padding: 0;">
          //       <p style="margin: 0; font-weight: 500;">₹</p>
          //     </div>
          //     <div style="width: 1px; background-color: black;"></div>
          //     <div style="width: 80%; display: flex; align-items: center; justify-content: center; padding: 0;">
          //       <p style="margin: 0; font-weight: 600;">${item.rate}.00</p>
          //     </div>
          //   </div>
          // </td>
//           <td style="font-size: 10.3px; border: 0.5px solid black; width: 13%; padding: 10px; ">
//             <p style="margin: 0; font-weight: 600;">₹${indianNumberFormat(item.length * item.pieces * item.rate)}.00</p>
//           </td>
//         </tr>
//       `).join('')}
//     </table>
//   `;
// };

// new one
const generateTableRows = () => {
  return `
      <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 2px;">
        ${billDetails.map((item, itemIndex) =>
    item.lengthAndPieces.map((lp, lpIndex) => `
            <tr key="${itemIndex}-${lpIndex}" style="height: 30px; text-align: center; ">
              
              ${lpIndex === 0 ? `
                <td style="font-size: 10px; width: 23%; padding: 0; border-top: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                  <p style="margin: 0; font-weight: 500; font-size: 12px; margin-bottom: 2px;"><u>Colour: ${item.color}</u></p>
                  <u style="margin: 0; font-weight: 500; font-size: 12px;">${item.type}</u>
                </td>
              ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                <td style="font-size: 10px; width: 23%; padding: 10px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                
                </td>
              ` : `
                <td style="font-size: 10px; width: 23%; padding: 10px; border-right: 0.5px solid black; border-left: 0.5px solid black;">

                </td>
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

              <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 0; ">
                <p style="margin: 0; font-weight: 500;">${lp.pieces}</p>
              </td>

              <td style="font-size: 10px; border: 0.5px solid black; width: 15%; padding: 0; ">
                <div style="display: flex; height: 35px;">
                  <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <p style="margin: 0; font-weight: 500;">${lp.pieces * lp.length}.00</p>
                  </div>
                  <div style="width: 1px; background-color: black; height: 100%;"></div>
                  <div style="width: 35%; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <p style="margin: 0; font-weight: 600;"></p>
                  </div>
                </div>
              </td>

              ${lpIndex === 0 ? `
                <td style="font-size: 10px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 0;">
                
                </td>
                ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                <td style="font-size: 10px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 0;">
                
                </td>
                ` : `
                <td style="font-size: 10px; border-right: 0.5px solid black; width: 17%; padding: 0;">
                
                </td>
              `}
              
              ${lpIndex === 0 ? `
                <td style="font-size: 10.3px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 13%; padding: 10px;">

                </td>
              ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                <td style="font-size: 10.3px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 13%; padding: 10px;">

                </td>
              ` : `
                <td style="font-size: 10.3px; border-right: 0.5px solid black; width: 13%; padding: 10px;">

                </td>
              `}
              
            </tr>
          `).join('')
  ).join('')}
      </table>
    `;
};

// length
{/* <div style="border-bottom: 0.5px solid black; height: 35px; display: flex; align-items: center; justify-content: center; padding: 0;">
  <p style="margin: 0; font-weight: 500; font-size: 11px;">${lp.length} ${item.unit}</p>
</div> */}
{/* <div style="height: 1px; background-color: black;"></div>
              <div style="height: 35px; display: flex; align-items: center; justify-content: center; padding: 0;">
                <p style="margin: 0; font-weight: 500;">Total</p>
              </div> */}

// pieces
{/* <div style="border-bottom: 0.5px solid black; height: 35px; padding: 0; display: flex; align-items: center; justify-content: center;">
  <p style="margin: 0; font-weight: 500;">${lp.pieces}</p>
</div> */}
{/* <div style="height: 1px; background-color: black;"></div>
              <div style="height: 35px; display: flex; align-items: center; justify-content: center; padding: 0;">
                <p style="margin: 0; font-weight: 500;">Total</p>
              </div> */}

// quantity
{/* <div style="border-bottom: 0.5px solid black; height: 35px; display: flex; align-items: center; justify-content: center; padding: 0;">
  <p style="margin: 0; font-weight: 500;">${lp.pieces * lp.length}</p>
</div>
<div style="height: 1px; background-color: black;"></div>
<div style="display: flex; height: 35px;">
  <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
    <p style="margin: 0; font-weight: 500;">${lp.pieces * lp.length}</p>
  </div>
  <div style="width: 1px; background-color: black; height: 100%;"></div>
  <div style="width: 35%; display: flex; align-items: center; justify-content: center; padding: 0;">
    <p style="margin: 0; font-weight: 600;">Rft</p>
  </div>
</div> */}

// Rate
{/* <div style="border-bottom: 0.5px solid black; height: 35px; padding: 0; display: flex; align-items: center; justify-content: center;">
                <p style="margin: 0; font-weight: 600;">Per Rft</p>
              </div>
              <div style="height: 1px; background-color: black;"></div>
              <div style="display: flex; height: 35px;">
                <div style="width: 20%; display: flex; align-items: center; justify-content: center; padding: 0;">
                  <p style="margin: 0; font-weight: 500;">₹</p>
                </div>
                <div style="width: 1px; background-color: black;"></div>
                <div style="width: 80%; display: flex; align-items: center; justify-content: center; padding: 0;">
                  <p style="margin: 0; font-weight: 600;">${item.rate}.00</p>
                </div>
              </div> */}

// ${ lpIndex === 0 ? `<p style="margin: 0; font-weight: 500; font-size: 12px;">${item.thickness}</p>` : '' }

// ${ lpIndex === 0 ? `<p style="margin: 0; font-weight: 500; font-size: 12px;">${item.width}</p>` : '' }

// Amount
{/* <p style="margin: 0; font-weight: 600;">₹${indianNumberFormat(lp.length * lp.pieces * item.rate)}.00</p> */ }

{
  // error2 && (
  //   <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 12, backgroundColor: 'yellow', overflow: 'hidden', borderColor: zomatoRed, borderWidth: 0.4, borderRadius: 4, }}>
  //     <View style={{ backgroundColor: zomatoRed, width: 20, flexDirection: 'row', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
  //       <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.5), fontWeight: '900' }}>!</Text>
  //     </View>
  //     <Text style={{ color: zomatoRed, fontSize: responsiveFontSize(1.5), paddingVertical: 5, paddingLeft: 5, }}>
  //       Please fill in all the details before the invoice is generated.
  //     </Text>
  //   </View>
  // )
}