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
    var price = parseInt($row.find(".a-price").text().replace("VNĐ", "").replace(" ", ""));
    console.log(quantity, price)
    var subTotal = quantity * price;
    $row.find(".sub-price").text(subTotal.toFixed(2) + "VNĐ");
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
      var currentPrice = parseInt(subPriceCell.text().replace("VNĐ", "").replace(" ", "")) + parseInt(priceCell.text().replace("VNĐ", "").replace(" ", ""));
      existingRow.find(".sub-price").text(currentPrice + " VNĐ");
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
      calculateReciept();
    }
  });


  $("#cart").on("click", ".plus, .minus, .delete-from-cart, .add-to-cal", function(event) {
    event.preventDefault();
    calculateReciept();
      
  });

  function calculateReciept(){
    var subPriceAll = 0;
    $("#cart tr").each(function() {
      var aPrice = parseInt($(this).find(".sub-price").text().replace(" VNĐ", ""));
      subPriceAll += aPrice;
      console.log(aPrice)
      
    })
    console.log(subPriceAll)

    $(".sub-price-all").text(subPriceAll.toFixed(2));
    $(".sub-price-take").text(subPriceAll.toFixed(2));  
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
  $(document).ready(function() {
    $(".charge-reciept").click(function() {
      // Lấy nội dung của tbody
      var tbodyContent = $("#print-area").html();
  
      // Tạo một cửa sổ mới để hiển thị nội dung
      var newWindow = window.open("", "_blank");
      newWindow.document.write(`
      <html>
      <head>
      <title>Receipt</title>
      <link href="vendors/pos.assets/css/bootstrap.css" rel="stylesheet" type="text/css" />
      <link href="vendors/pos.assets/css/ui.css" rel="stylesheet" type="text/css" />
      <link href="vendors/pos.assets/fonts/fontawesome/css/fontawesome-all.min.css" type="text/css" rel="stylesheet">
      <link href="vendors/pos.assets/css/OverlayScrollbars.css" type="text/css" rel="stylesheet" />
      </head>
      `);
  
      // In nội dung của tbody vào cửa sổ mới
      newWindow.document.write("<body>" + tbodyContent + "</body>");
  
      newWindow.document.write("</html>");
      newWindow.document.close();
  
      // In cửa sổ mới
      newWindow.print();
    });
  });
  $('#search-input').on('input', function () {
    // Lấy giá trị nhập vào ô tìm kiếm
    var searchText = $(this).val().toLowerCase();

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
});