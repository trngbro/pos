$(document).ready(function() {
  $("#cart").on("click", ".minus", function(event) {
    event.preventDefault();
    var quantityCell = $(this).closest("tr").find(".quantity");
    var currentQuantity = parseInt(quantityCell.text());
    if (currentQuantity > 1) {
      quantityCell.text(currentQuantity - 1);
      updateRow(this);
    }
    else{
      $(this).closest("tr").remove();
    }
  });
  $("#cart").on("click", ".plus", function(event) {
    event.preventDefault();
    var quantityCell = $(this).closest("tr").find(".quantity");
    var currentQuantity = parseInt(quantityCell.text());
    quantityCell.text(currentQuantity + 1)
    updateRow(this);
  });
  function updateRow(trigger){
    var $row = $(trigger).closest("tr");
    var quantity = parseInt($row.find(".quantity").text());
    var price = parseInt($row.find(".a-price").text().replace(/[^0-9]/g, ''));
    var subTotal = quantity * price;
    $row.find(".sub-price").text(subTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
  }
  $(".add-to-cart").click(function(event) {
    event.preventDefault();

    var productId = $(this).closest(".card-product").find(".product-id").text();
    var existingRow = $("#cart tr[data-product-id='" + productId + "']");

    if (existingRow.length) {
      var quantityCell = existingRow.find(".quantity");
      var currentQuantity = parseInt(quantityCell.text());
      quantityCell.text(currentQuantity + 1);

      var priceCell = existingRow.find(".a-price");
      var subPriceCell = existingRow.find(".sub-price");
      var currentPrice = parseInt(subPriceCell.text().replace(/[^0-9]/g, '')) + parseInt(priceCell.text().replace(/[^0-9]/g, ''));
      existingRow.find(".sub-price").text(currentPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
    } 
    else {
      var newRow = $("<tr data-product-id='" + productId + "'>");
      newRow.html(
        `
          <td>
            <figure class="media">
            
              <div class="img-wrap"><img src="`+ $(this).closest(".card-product").find("img").attr("src") +`" class="img-thumbnail img-xs"></div>
              <figcaption class="media-body">
                <h6 class="title text-truncate"> ` + $(this).closest(".card-product").find(".title").text() + ` </h6>
              </figcaption>
            </figure>
          </td>
          <td class="text-center">
            <div class="m-btn-group m-btn-group--pill btn-group mr-2" role="group" aria-label="...">
              <button type="button" class="m-btn btn btn-default minus"><i class="fa fa-minus"></i></button>
              <button type="button" class="m-btn btn btn-default quantity" disabled>1</button>
              <button type="button" class="m-btn btn btn-default plus"><i class="fa fa-plus"></i></button>
            </div>
          </td>
          <td>
            <div class="price-wrap">
              <var class="sub-price">` + $(this).closest(".card-product").find(".price-new").text() +`</var>
              <span class="a-price" style="display: none;">` + $(this).closest(".card-product").find(".price-new").text() + `</span>
            </div> <!-- price-wrap .// -->
          </td>
          <td class="text-right">
            <a href="" class="btn btn-outline-danger delete-from-cart"> <i class="fa fa-trash"></i></a>
          </td>
        `
        );


      // Thêm sản phẩm vào giỏ hàng (thẻ có id "cart")
      $("#cart").append(newRow);
      
    }
    calculateReciept();
  });


  $("#cart").on("click", ".plus, .minus, .delete-from-cart, .add-to-cal", function(event) {
    event.preventDefault();
    calculateReciept();
  });

  $("#makeRecieptFromCart").popover({
    trigger: "focus", // Đặt trigger thành "manual" để bạn có thể kiểm soát việc hiển thị popover
  });

  $("#makeRecieptFromCart").on("click", function(event) {
    event.preventDefault();

    const isEmptyCustomer = $("#customerFindedID").text().trim() === "";
    const isEmptyCartList = $("#cart").children().length == 0

    console.log(isEmptyCartList, isEmptyCustomer)
    
    if (isEmptyCustomer || isEmptyCartList) {
        $("#invoiceModal").modal("hide");
        $("#makeRecieptFromCart").popover("show");
    } else {
        $("#invoiceModal").modal("show");
        $("#makeRecieptFromCart").popover("hide");
        getDataFromCartToReciept();
    }

    event.stopPropagation();
  });

  function calculateReciept(){
    var subPriceAll = 0;
    $("#cart tr").each(function() {
      var aPrice = parseFloat($(this).find(".sub-price").text().replace(/[^0-9]/g, ''));
      subPriceAll += aPrice; 
    })

    $(".sub-price-all").text(subPriceAll.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
    $(".sub-price-take").text(subPriceAll.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));  
  }

  // Xử lý sự kiện xóa khỏi giỏ hàng
  $("#cart").on("click", ".delete-from-cart", function(event) {
    event.preventDefault();
    $(this).closest("tr").remove();
  });
  $(document).ready(function() {
    $(".cancel-cart").click(function() {
      $(".sub-price-all").text(0);
      $(".sub-price-take").text(0); 
      $("#cart").find("tr").remove();
    });
  });

  $('#search-input').on('input', function () {
    // Lấy giá trị nhập vào ô tìm kiếm
    var searchText = $(this).val().toLowerCase();

    if(/^\d{13}$/.test(searchText)){
      var $col3Elements = $("div.col-md-3").filter(function() {
        return $(this).find(".product-id").text() === searchText;
      });
      $col3Elements.each(function() {
        var $col3 = $(this);
        
        // Lấy thông tin sản phẩm từ các phần tử con trong $col3
        var productName = $col3.find(".title").text();
        var price = $col3.find(".price-new").text();
        var productImage = $col3.find("img").attr("src");
        var productId = $col3.find(".product-id").text();

        var existingRow = $("#cart tr[data-product-id='" + productId + "']");
        
        if (existingRow.length) {
          var quantityCell = existingRow.find(".quantity");
          var currentQuantity = parseInt(quantityCell.text());
          quantityCell.text(currentQuantity + 1);
    
          var priceCell = existingRow.find(".a-price");
          var subPriceCell = existingRow.find(".sub-price");
          var currentPrice = parseInt(subPriceCell.text().replace(/[^0-9]/g, '')) + parseInt(priceCell.text().replace(/[^0-9]/g, ''));
          existingRow.find(".sub-price").text(currentPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
        } 
        else {
          var newRow = $("<tr data-product-id='" + productId + "'>");
          newRow.html(
            `
              <td>
                <figure class="media">
                
                  <div class="img-wrap"><img src="`+ productImage +`" class="img-thumbnail img-xs"></div>
                  <figcaption class="media-body">
                    <h6 class="title text-truncate"> ` + productName + ` </h6>
                  </figcaption>
                </figure>
              </td>
              <td class="text-center">
                <div class="m-btn-group m-btn-group--pill btn-group mr-2" role="group" aria-label="...">
                  <button type="button" class="m-btn btn btn-default minus"><i class="fa fa-minus"></i></button>
                  <button type="button" class="m-btn btn btn-default quantity" disabled>1</button>
                  <button type="button" class="m-btn btn btn-default plus"><i class="fa fa-plus"></i></button>
                </div>
              </td>
              <td>
                <div class="price-wrap">
                  <var class="sub-price">` + price +`</var>
                  <span class="a-price" style="display: none;">` + price + `</span>
                </div> <!-- price-wrap .// -->
              </td>
              <td class="text-right">
                <a href="" class="btn btn-outline-danger delete-from-cart"> <i class="fa fa-trash"></i></a>
              </td>
            `
            );
    
    
          // Thêm sản phẩm vào giỏ hàng (thẻ có id "cart")
          $("#cart").append(newRow);
          
        }
        calculateReciept();
      })

      if($col3Elements){
        alert("Please check again")
      }

      $(this).val("")
    }

    // Lọc và hiển thị sản phẩm dựa trên giá trị tìm kiếm
    $('.col-md-3').each(function () {
        var title = $(this).find('.title').text().toLowerCase();
        if (title.includes(searchText)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
  });

  $('form.search-wrap').on('submit', function(event) {
    // Lấy giá trị nhập vào ô tìm kiếm
    event.preventDefault();
    searchValue = $('#search-input').val();
    
  })
});

function getDataFromCartToReciept() {
  // Lấy danh sách các sản phẩm từ bảng
  var products = [];
  $("#cart tr[data-product-id]").each(function () {
    var product = {};
    product.product_id = $(this).data("product-id");
    product.title = $(this).find(".title").text();
    product.quantity = $(this).find(".quantity").text();
    product.subprice = $(this).find(".sub-price").text();
    products.push(product);
  });

  // Lấy thông tin giảm giá và tổng cộng
  var discount = $(".discount a").text();
  var subTotal = $(".sub-price-all").text();
  var totalAmount = $(".sub-price-take").text();
  var customerPhone = $("#phoneNumber").val();

  // Tạo hoặc cập nhật dữ liệu trong modal theo nhu cầu
  $("#invoiceModal .modal-body tbody").empty(); // Xóa dữ liệu cũ
  products.forEach(function (product, index) {
    var row = $("<tr>");
    row.append($("<td>").text(index + 1));
    row.append($("<td>").text(product.title));
    row.append($("<td>").text(product.quantity));
    row.append($("<td>").text(product.subprice));
    $("#invoiceModal .modal-body tbody").append(row);
  });

  $("#totalAmount").text(totalAmount);

  return {products, totalAmount, customerPhone}
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return "emptyCookies"
}

document.getElementById("printOutReciept").onclick = function () {
  const {products, totalAmount, customerPhone} = getDataFromCartToReciept();
  const formatttm = parseInt(totalAmount.replace(/[^\d]/g, ""))
  console.log(formatttm)
  $.post("/pos/makeReciept", { products: JSON.stringify(products), totalAmount: formatttm, customerPhone:customerPhone, userLogs: getCookie("userLog") }, function (data) {
    if (data === "Done") {
      console.log("Receipt data received successfully.");
      printElement(document.getElementById("printAreaContent"));
    } else {
        return;
    }
  });

  $(".sub-price-all").text(0);
  $(".sub-price-take").text(0); 
  $("#cart").find("tr").remove();
};

function printElement(elem) {
  var domClone = elem.cloneNode(true);

  var $printSection = document.getElementById("printSection");

  if (!$printSection) {
      var $printSection = document.createElement("div");
      $printSection.id = "printSection";
      var $logoImage = document.createElement("img");
      $logoImage.style.minHeight = "60px";
      $logoImage.src = "./favicon.ico";
      document.body.appendChild($logoImage);
      document.body.appendChild($printSection);
  }

  $printSection.innerHTML = "";
  $printSection.appendChild(domClone);
  $printSection.style.width = "100%";
  $printSection.style.fontSize = "200%";
  window.print();
}

$(document).ready(function () {
  $("#phoneNumber").on("input", function () {
    const phoneNumberField = $("#phoneNumber");
    phoneNumberField.removeClass("error");
  });
  $("#payloadCustomer").click(function () {
      const phoneNumber = $("#phoneNumber").val();
      const phoneNumberField = $("#phoneNumber");
      const phonePattern = /^0\d{9}$/;

      if(!phonePattern.test(phoneNumber)){
        phoneNumberField.addClass("error");
      }
      else{
        phoneNumberField.removeClass("error");
        $.post("/pos/findUser", { phone: phoneNumber }, function (data) {
          if (data !== undefined) {
              $("#customerFindedName").val(data.name);
              $("#customerFindedID").text(data.phone);
          } else {
              $("#customerFindedName").val("User not found");
              $("#customerPhoneNumber").val(phoneNumber);
              $("#customerModal").modal("show");
          }
        });
      }
  });

  $(document).ready(function () {
    $("#saveCustomer").click(function () {
      var phoneNumber = $("#customerPhoneNumber").val();
      var name = $("#customerName").val();
      var address = $("#customerAddress").val();
      var phonePattern = /^0\d{9}$/;
  
      if (!phonePattern.test(phoneNumber)) {
        alert("Phone number must be 10 digits and start with 0");
        return; 
      }
  
      $.ajax({
        url: "/pos/addCustomer", // Replace with the actual server endpoint
        method: "POST",
        data: {
          name: name,
          phone: phoneNumber,
          address: address,
        },
        success: function (response) {
          alert("Add a new customer successfully!")
        },
        error: function (error) {
          alert("Do not add this customer!")
        },
      });
  
      $("#customerModal").modal("hide");
    });
  });
  
  
  $("#refreshNewOne").click(function () {
      $("#phoneNumber").val("");
      $("#customerFindedName").val("");
      $("#customerFindedID").text("");
  });
});

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname === '/logout') {
      localStorage.clear();
  }

  var image = localStorage.getItem("image");
  var name = localStorage.getItem("name");

  if (image && name) {
      $(".userImageFromCookieByBase64").attr("src", image);
      $(".profile_info strong").text(name);
  } else {
  }
})
