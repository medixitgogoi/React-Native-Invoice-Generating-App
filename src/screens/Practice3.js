{
  item?.order_status === '1' ? (
    <View style={{ backgroundColor: lightZomatoRed, padding: 5, borderRadius: 5, elevation: 1, borderColor: zomatoRed, borderWidth: 0.6 }}>
      <Text style={{ color: zomatoRed, fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>To be dispatched</Text>
    </View>
  ) : (
  <View style={{ backgroundColor: '#c5f8a4', borderRadius: 5, elevation: 1, borderColor: '#3f910b', borderWidth: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5, gap: 2 }}>
    <Text style={{ color: "#3f910b", fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>Dispatched</Text>
    <Icon3 name="check" style={{ width: 15, height: 15, color: '#3f910b', paddingTop: 2 }} />
  </View>
)
}

{/* Dispatched Orders */ }
<View>
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, marginTop: 10, justifyContent: 'space-between' }}>
    <Icon3 name="pin" size={23} color={zomatoRed} />
    <Text style={{ color: '#5f5f5f', fontSize: responsiveFontSize(2.1), fontWeight: '500', textTransform: 'uppercase' }}>Orders that are dispatched</Text>
    <Icon3 name="pin" size={23} color={zomatoRed} />
  </View>

  <View style={{ paddingHorizontal: 8, paddingVertical: 12, flexDirection: 'column', gap: 8, }}>

    {dispatchedOrders.length === 0 && (
      <FlatList
        data={[1]}
        renderItem={() => (
          <View style={{ flexDirection: 'column', width: '100%', height: 200, backgroundColor: '#d8dbdb', padding: 10, marginTop: 2, marginBottom: 8, borderRadius: 7, gap: 8 }}>
            <ShimmerPlaceHolder style={{ width: '100%', height: 50, backgroundColor: '#f2f3f3', borderRadius: 7, }}>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder style={{ width: '100%', height: 120, backgroundColor: '#f2f3f3', borderRadius: 7, }}>
            </ShimmerPlaceHolder>
          </View>
        )}
      />
    )}

    {dispatchedOrders?.map((item) => (
      <View style={{ width: '100%', borderRadius: 6, flexDirection: 'column', borderColor: '#6f8990', borderWidth: 0.5, overflow: 'hidden', backgroundColor: '#fff' }} key={item.id}>

        {/* Top */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#edf5fa', padding: 12, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, }}>
          <View style={{ flexDirection: 'column', }}>
            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600', textTransform: 'uppercase' }}>{getHighlightedText(item?.client_name, search)}</Text>
            <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Ganeshguri, Guwahati</Text>
          </View>
          <View style={{ backgroundColor: '#c5f8a4', borderRadius: 5, elevation: 1, borderColor: '#3f910b', borderWidth: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5, gap: 2 }}>
            <Text style={{ color: "#3f910b", fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>Dispatched</Text>
            <Icon3 name="check" style={{ width: 15, height: 15, color: '#3f910b', paddingTop: 2 }} />
          </View>
        </View>

        {/* Bottom */}
        <View style={{ padding: 12 }}>

          {/* Details */}
          <View style={{ flexDirection: 'column', gap: 5, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, borderStyle: 'dashed', paddingBottom: 10 }}>
            {item.orderDetails.map(item => {

              const totalPieces = item.orderData.reduce((pi, item) => {
                return pi + parseInt(item.quantity);
              }, 0);

              return (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ color: '#6f8990', fontWeight: '600' }}>{totalPieces} x</Text>
                  <Text style={{ color: '#000', fontWeight: '500' }}>{item.product_type}</Text>
                  <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
                  <Text style={{ color: '#000', fontWeight: '500' }}>{item.color}</Text>
                </View>
              )
            })}
          </View>

          {/* Date and Amount */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
            <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.7) }}>{convertedDate(item?.order_date)}</Text>
            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>₹{indianNumberFormat(item?.payble_amount)}</Text>
          </View>

          {/* View Order Button */}
          <TouchableOpacity style={{ backgroundColor: zomatoRed, borderRadius: 6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 8, gap: 5 }} onPress={() => navigation.navigate('OrderDetails', { data: item })}>
            <View style={{ backgroundColor: lightZomatoRed, borderRadius: 5, width: 22, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Icon2 name="receipt-outline" size={14} color={zomatoRed} />
            </View>
            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '500', textTransform: 'uppercase' }}>View Order</Text>
          </TouchableOpacity>

        </View>

      </View>
    ))}

  </View>
</View>

{/* Yet To Be Dispatched Orders */ }
<View>
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, justifyContent: 'space-between', marginTop: 10 }}>
    <Icon3 name="pin" size={23} color={zomatoRed} />
    <Text style={{ color: '#5f5f5f', fontSize: responsiveFontSize(2.1), fontWeight: '500', textTransform: 'uppercase' }}>Orders that are yet to be dispatched</Text>
    <Icon3 name="pin" size={23} color={zomatoRed} />
  </View>

  <View style={{ paddingHorizontal: 8, paddingVertical: 12, flexDirection: 'column', gap: 8 }}>

    {toBeDispatchedOrders.length === 0 && (
      <FlatList
        data={[1, 1]}
        renderItem={() => (
          <View style={{ flexDirection: 'column', width: '100%', height: 200, backgroundColor: '#d8dbdb', padding: 10, marginTop: 2, marginBottom: 8, borderRadius: 7, gap: 8 }}>
            <ShimmerPlaceHolder style={{ width: '100%', height: 50, backgroundColor: '#f2f3f3', borderRadius: 7, }}>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder style={{ width: '100%', height: 120, backgroundColor: '#f2f3f3', borderRadius: 7, }}>
            </ShimmerPlaceHolder>
          </View>
        )}
      />
    )}

    {toBeDispatchedOrders?.map((item) => (
      <View style={{ width: '100%', borderRadius: 6, flexDirection: 'column', borderColor: '#6f8990', borderWidth: 0.5, overflow: 'hidden', backgroundColor: '#fff' }} key={item.id}>

        {/* Top */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#edf5fa', padding: 12, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, }}>
          <View style={{ flexDirection: 'column', }}>
            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600', textTransform: 'uppercase' }}>{item?.client_name}</Text>
            <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.8), fontWeight: '500' }}>Ganeshguri, Guwahati</Text>
          </View>
          <View>
            <View style={{ backgroundColor: lightZomatoRed, padding: 5, borderRadius: 5, elevation: 1, borderColor: zomatoRed, borderWidth: 0.6 }}>
              <Text style={{ color: zomatoRed, fontWeight: '500', fontSize: responsiveFontSize(1.7) }}>To be dispatched</Text>
            </View>
          </View>
        </View>

        {/* Bottom */}
        <View style={{ padding: 12 }}>

          <View style={{ flexDirection: 'column', gap: 5, borderBottomColor: '#6f8990', borderBottomWidth: 0.5, borderStyle: 'dashed', paddingBottom: 10 }}>
            {item.orderDetails.map(item => {

              const totalPieces = item.orderData.reduce((pi, item) => {
                return pi + parseInt(item.quantity);
              }, 0);

              return (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ color: '#6f8990', fontWeight: '600' }}>{totalPieces} x</Text>
                  <Text style={{ color: '#000', fontWeight: '500' }}>{item.product_type}</Text>
                  <Text style={{ color: '#000', fontWeight: '500', marginHorizontal: 3 }}>•</Text>
                  <Text style={{ color: '#000', fontWeight: '500' }}>{item.color}</Text>
                </View>
              )
            })}
          </View>

          {/* Date and Amount */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
            <Text style={{ color: '#6f8990', fontSize: responsiveFontSize(1.7) }}>{convertedDate(item?.order_date)}</Text>
            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>₹{indianNumberFormat(item?.payble_amount)}</Text>
          </View>

          {/* View Order Button */}
          <TouchableOpacity style={{ backgroundColor: zomatoRed, borderRadius: 6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 8, gap: 5 }} onPress={() => navigation.navigate('OrderDetails', { data: item })}>
            <View style={{ backgroundColor: lightZomatoRed, borderRadius: 5, width: 22, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Icon2 name="receipt-outline" size={14} color={zomatoRed} />
            </View>
            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '500', textTransform: 'uppercase' }}>View Order</Text>
          </TouchableOpacity>

        </View>

      </View>
    ))}

  </View>
</View>