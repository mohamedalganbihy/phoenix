// تحديث بيانات العميل
function updateCustomer(params) {
  try {
    const { customerId, name, phone, email, type, city, registrationDate, address, notes } = params;
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('العملاء');
    
    if (!sheet) {
      return { success: false, error: 'ورقة العملاء غير موجودة' };
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // البحث عن الصف المناسب
    let rowIndex = -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == customerId) {
        rowIndex = i;
        break;
      }
    }
    
    if (rowIndex === -1) {
      return { success: false, error: 'لم يتم العثور على العميل' };
    }
    
    // تحديث الحقول
    const nameCol = headers.indexOf('الاسم');
    if (nameCol !== -1) sheet.getRange(rowIndex + 1, nameCol + 1).setValue(name);
    
    const phoneCol = headers.indexOf('الهاتف');
    if (phoneCol !== -1) sheet.getRange(rowIndex + 1, phoneCol + 1).setValue(phone);
    
    const emailCol = headers.indexOf('البريد');
    if (emailCol !== -1) sheet.getRange(rowIndex + 1, emailCol + 1).setValue(email);
    
    const typeCol = headers.indexOf('النوع');
    if (typeCol !== -1) sheet.getRange(rowIndex + 1, typeCol + 1).setValue(type);
    
    const cityCol = headers.indexOf('المدينة');
    if (cityCol !== -1) sheet.getRange(rowIndex + 1, cityCol + 1).setValue(city);
    
    const dateCol = headers.indexOf('تاريخ التسجيل');
    if (dateCol !== -1) sheet.getRange(rowIndex + 1, dateCol + 1).setValue(registrationDate);
    
    const addressCol = headers.indexOf('العنوان');
    if (addressCol !== -1) sheet.getRange(rowIndex + 1, addressCol + 1).setValue(address);
    
    const notesCol = headers.indexOf('ملاحظات');
    if (notesCol !== -1) sheet.getRange(rowIndex + 1, notesCol + 1).setValue(notes);
    
    SpreadsheetApp.flush();
    
    return {
      success: true,
      message: 'تم تحديث بيانات العميل بنجاح'
    };
    
  } catch (error) {
    Logger.log('Error in updateCustomer: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// حذف عميل
function deleteCustomer(params) {
  try {
    const { customerId } = params;
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('العملاء');
    
    if (!sheet) {
      return { success: false, error: 'ورقة العملاء غير موجودة' };
    }
    
    const data = sheet.getDataRange().getValues();
    
    // البحث عن الصف المناسب
    let rowIndex = -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == customerId) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex === -1) {
      return { success: false, error: 'لم يتم العثور على العميل' };
    }
    
    // حذف الصف
    sheet.deleteRow(rowIndex);
    SpreadsheetApp.flush();
    
    return {
      success: true,
      message: 'تم حذف العميل بنجاح'
    };
    
  } catch (error) {
    Logger.log('Error in deleteCustomer: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// تحديث حالة الطلب
function updateOrderStatus(params) {
  try {
    const { orderId, status, paymentStatus, notes, deliveryDate } = params;
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('الطلبات');
    
    if (!sheet) {
      return { success: false, error: 'ورقة الطلبات غير موجودة' };
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // البحث عن الصف المناسب
    let rowIndex = -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == orderId) {
        rowIndex = i;
        break;
      }
    }
    
    if (rowIndex === -1) {
      return { success: false, error: 'لم يتم العثور على الطلب' };
    }
    
    // تحديث الحقول
    const statusCol = headers.indexOf('الحالة');
    if (statusCol !== -1) sheet.getRange(rowIndex + 1, statusCol + 1).setValue(status);
    
    const paymentStatusCol = headers.indexOf('حالة الدفع');
    if (paymentStatusCol !== -1) sheet.getRange(rowIndex + 1, paymentStatusCol + 1).setValue(paymentStatus);
    
    const notesCol = headers.indexOf('ملاحظات');
    if (notesCol !== -1) sheet.getRange(rowIndex + 1, notesCol + 1).setValue(notes);
    
    if (deliveryDate) {
      const deliveryCol = headers.indexOf('تاريخ التسليم الفعلي');
      if (deliveryCol !== -1) sheet.getRange(rowIndex + 1, deliveryCol + 1).setValue(deliveryDate);
    }
    
    SpreadsheetApp.flush();
    
    return {
      success: true,
      message: `تم تحديث حالة الطلب إلى "${status}" بنجاح`
    };
    
  } catch (error) {
    Logger.log('Error in updateOrderStatus: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}