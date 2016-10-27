/**
 * Created by 鑫 on 2016/10/16.
 */



function upload(){
    var fd = new FormData();
    // 加入文件

    fd.append( "myfile", $("#myfile")[0].files[0] );
    // files字段里面包含了所有的文件，但是当前只选择一个文件

    //准备初始化ajax请求
    var xhr = new XMLHttpRequest();
    // 绑定相关的监听器
    //进度监听器，在上传过程中会多次触发
    // onprogress表示的是当前的下载进度，upload.onprogress监听的是当前上传的进度
    xhr.upload.onprogress = function( event ){
        if( event.lengthComputable ){
            var percent = Math.round( event.loaded * 100 / event.total );
            console.log( '%d%', percent );
            $('#upprog').text( percent );
        }
    }
    // 传输开始事件

    xhr.onloadstart = function(){
        console.log('upload start');

        $('#upprog').text('开始上传');
        $('#stopbtn').one( 'click',function(){
            xhr.abort();
            $(this).hide();
        } );

        loading(true);
    }

    xhr.onloaded = function( event ){
        console.log( 'load end' );
        loading( false );
    }


    xhr.onabort = function(event){
        console.log('abort');
        $('#upprog').text('操作被取消');
    }
    xhr.onload = function( event ){
        console.log( 'log success' );
        $('#upprog').text('上传成功');

        console.log(xhr.responseText);


    }

    xhr.onerror = function(event){
        console.log('error');
        $('#upprog').text('发生错误');
    }


    function loading( showloading ){
        if( showloading ){
            $('#uptxt').show();
            $('#stopbtn').show();
        }
        else{
            $('#uptxt').hide();
            $('#stopbtn').hide();
        }
    }


    // 发送
    xhr.open('POST','/upload/upfile',true);
    xhr.send(fd);
}
