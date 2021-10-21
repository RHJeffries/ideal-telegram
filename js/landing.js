

//event listener for buttons
$('.row.emojiPadding div button').click(function (event){
    let ele = event.target
    if(ele.tagName === 'I'){
        let selectedEmotion = ele.id
        localStorage.setItem('selectedEmotion', JSON.stringify(selectedEmotion))
        window.location.href = "landing.html"
    }else{
        let selectedEmotion = $(ele).find('i').attr('id')
        localStorage.setItem('selectedEmotion', JSON.stringify(selectedEmotion))
        window.location.href = "landing.html"
    }
    //console.log(ele.find('I'))
})