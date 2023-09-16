
$(function(){
  $("h1").append("を始めます")
});
$(function(){
  $("#btn").on("click",function() {
    $("btn").html("<p>ここをクリック</p>")
    $(this).text("クリックされました")
  });
});
