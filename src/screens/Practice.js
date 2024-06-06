const generateTableRows = () => {
  return `
    <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 2px;">
      ${billDetails.map((item, index) => `
        <tr key=${index} style="height: 30px; text-align: center;">
          <td style="font-size: 10px; border: 0.5px solid black; width: 23%; padding: 10px;">
            <p style="margin: 0; font-weight: 500; font-size: 12px; margin-bottom: 2px; "><u>Colour: ${item.color}</u></p>
            <u style="margin: 0; font-weight: 500; font-size: 12px;">${item.type}</u>
          </td>
          <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px; ">
            <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.thickness}</p>
          </td>
          <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 6px; ">
            <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.width}</p>
          </td>
          <td style="font-size: 10px; border: 0.5px solid black; width: 8%; vertical-align: top; padding: 0;">
            <div style="border-bottom: 0.5px solid black; height: 35px; display: flex; align-items: center; justify-content: center; padding: 0;">
              <p style="margin: 0; font-weight: 500; font-size: 11px;">${item.length} ${item.unit}</p>
            </div>
            <div style="height: 1px; background-color: black;"></div>
            <div style="height: 35px; display: flex; align-items: center; justify-content: center; padding: 0;">
              <p style="margin: 0; font-weight: 500;">Total</p>
            </div>
          </td>
          <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 0; vertical-align: top; ">
            <div style="border-bottom: 0.5px solid black; height: 35px; padding: 0; display: flex; align-items: center; justify-content: center;">
              <p style="margin: 0; font-weight: 500;">${item.pieces}</p>
            </div>
            <div style="height: 1px; background-color: black;"></div>
            <div style="height: 35px; display: flex; align-items: center; padding: 0; justify-content: center;">
              <p style="margin: 0; font-weight: 500;">${item.pieces}</p>
            </div>
          </td>
          <td style="font-size: 10px; border: 0.5px solid black; width: 15%; padding: 0; vertical-align: top;">
            <div style="border-bottom: 0.5px solid black; height: 35px; display: flex; align-items: center; justify-content: center; padding: 0;">
              <p style="margin: 0; font-weight: 500;">${item.pieces * item.length}</p>
            </div>
            <div style="height: 1px; background-color: black;"></div>
            <div style="display: flex; height: 35px; ">
              <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
                <p style="margin: 0; font-weight: 500;">${item.pieces * item.length}</p>
              </div>
              <div style="width: 1px; background-color: black; height: 100%;"></div>
              <div style="width: 35%; display: flex; align-items: center; justify-content: center; padding: 0;">
                <p style="margin: 0; font-weight: 600;">Rft</p>
              </div>
            </div>
          </td>
          <td style="font-size: 10px; border: 0.5px solid black; width: 17%; padding: 0; vertical-align: top;">
            <div style="border-bottom: 0.5px solid black; height: 35px; padding: 0; display: flex; align-items: center; justify-content: center;">
              <p style="margin: 0; font-weight: 600;">Per Rft</p>
            </div>
            <div style="height: 1px; background-color: black;"></div>
            <div style="display: flex; height: 35px; ">
              <div style="width: 20%; display: flex; align-items: center; justify-content: center; padding: 0;">
                <p style="margin: 0; font-weight: 500;">₹</p>
              </div>
              <div style="width: 1px; background-color: black;"></div>
              <div style="width: 80%; display: flex; align-items: center; justify-content: center; padding: 0;">
                <p style="margin: 0; font-weight: 600;">${item.rate}.00</p>
              </div>
            </div>
          </td>
          <td style="font-size: 10.3px; border: 0.5px solid black; width: 13%; padding: 10px; ">
            <p style="margin: 0; font-weight: 600;">₹${indianNumberFormat(item.length * item.pieces * item.rate)}.00</p>
          </td>
        </tr>
      `).join('')}
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