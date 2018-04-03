;!(function ( window, factory ) {
    if ( typeof define === "function" && define.amd ) {
        define(factory);
    } else if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = factory();
    } else {
        window.jeBox = factory();
    }
})( this, function () {
    var Jeobj = {endfun : {}}, regPxe = /\px|em/g,
        ieBrowser = !-[1, ] ? parseInt(navigator.appVersion.split(";")[1].replace(/MSIE|[ ]/g, "")) : 9;
    //缂撳瓨甯哥敤瀛楃
    var doms = ["jeBox", ".jeBox-wrap", ".jeBox-header", ".jeBox-content", ".jeBox-footer", ".jeBox-close", ".jeBox-maxbtn"];
    var jeBox = {
        version: "1.5",
        jeidx: Math.floor(Math.random() * 9e3)
    };
    var jeDialog = function(options) {
        var that = this;
        var config = {
            cell: "", // 鐙珛ID,鐢ㄤ簬鎺у埗寮瑰眰鍞竴鏍囪瘑
            title: "鎻愮ず淇℃伅", // 鏍囬,鍙傛暟涓€锛氭彁绀烘枃瀛楋紝鍙傛暟浜岋細鎻愮ず鏉℃牱寮�  ["鎻愮ず淇℃伅",{color:"#ff0000"}]
            content: "鏆傛棤鍐呭锛�", // 鍐呭
            boxStyle: {}, //璁剧疆寮瑰眰鐨勬牱寮�
            closeBtn: true, // 鏍囬涓婄殑鍏抽棴鎸夐挳
            closefun: null,
            maxBtn: false, //鏄惁寮€鍚渶澶у寲鎸夐挳
            boxSize: ["auto", "auto"], // 鍙傛暟涓€锛氬脊灞傚搴︼紝鍙傛暟浜岋細 寮瑰眰楂樺害
            padding: "5px", // 鑷畾涔夎竟璺�
            offset: ["auto", "auto"], //鍧愭爣杞�
            type: 'dialog', // 鏄剧ず鍩烘湰灞傜被鍨�
            icon: 0, // 鍥炬爣,淇℃伅妗嗗拰鍔犺浇灞傜殑绉佹湁鍙傛暟
            button: [], // 鍚勬寜閽�
            btnAlign: "right", //btnAlign 鎸夐挳瀵归綈鏂瑰紡  left center right
            time: 0, // 鑷姩鍏抽棴鏃堕棿(绉�),0琛ㄧず涓嶈嚜鍔ㄥ叧闂�
            maskLock: true, // 鏄惁寮€鍚伄缃╁眰
            maskClose: true, // 鐐瑰嚮閬僵灞傛槸鍚﹀彲浠ュ叧闂�
            maskColor: ["#000", .5], // 鍙傛暟涓€锛氶伄缃╁眰棰滆壊锛屽弬鏁颁簩锛氶伄缃╁眰閫忔槑搴�
            isDrag: true, // 鏄惁鍙互鎷栨嫿
            fixed: true, // 鏄惁闈欐瀹氫綅
            zIndex: 9999, // 寮瑰眰灞傜骇鍏崇郴
            scrollbar: true, // 鏄惁鍏佽娴忚鍣ㄥ嚭鐜版粴鍔ㄦ潯
            shadow: true, //鎷栨嫿椋庢牸
            success: null, // 灞傚脊鍑哄悗鐨勬垚鍔熷洖璋冩柟娉�
            endfun: null
        };
        that.config = $.extend({}, config, options);
        that.jeidx = (that.config.cell == "" || that.config.cell == undefined) ? ++jeBox.jeidx : that.config.cell.replace(/[#.]/, "");
        that.initView()
    };
    var jefn = jeDialog.prototype;

    //鍒濆鍖栧苟鍔犺浇寮瑰眰楠ㄦ灦
    jefn.initView = function () {
        var that = this, opts = that.config, idx = that.jeidx,
            msgCell = opts.content, isType = opts.type, icons = opts.icon,
            lays = ['dialog', 'iframe', 'loading', 'tips'],
            conType = typeof msgCell === "object",
            msgType = msgCell[0] && msgCell[0].nodeType === 1,
            iconMsg = '<div class="jeBox-iconbox jeicon' + icons + '">' + msgCell + "</div>";
        Jeobj.scrollbar = opts.scrollbar;
        //鍒ゆ柇ID鏄惁宸茬粡瀛樺湪
        if (opts.cell && $("#" + doms[0] + that.jeidx)[0]) return;
        switch (isType) {
            case lays[0]:
                opts.type = lays[0];
                if (typeof msgCell === "string") {
                    opts.content = icons !== 0 ? iconMsg : msgCell;
                } else if (msgType) {
                    opts.content = "";
                    //鏌ヨ浼犲叆鐨勪綅缃�
                    Jeobj["dispy"+idx] = msgCell.css("display");
                    Jeobj["prev"+idx] = msgCell.prev();
                    Jeobj["next"+idx] = msgCell.next();
                    Jeobj["parent"+idx] = msgCell.parent();
                    if (msgCell.css("display") == "none") msgCell.css("display", "block");
                }
                jeBox.closeAll(lays[0]);
                break;
            case lays[1]:
                opts.type = lays[1];
                var conMsg = conType ? msgCell : [msgCell || "http://www.jemui.com/", "auto"];
                opts.content = '<iframe scrolling="' + (conMsg[1] || "auto") + '" allowtransparency="true" id="jeboxiframe' + idx + '" name="' + idx + '" onload="this.className=\'\';" frameborder="0" width="100%" height="100%" src="' + conMsg[0] + '"></iframe>';
                jeBox.closeAll(lays[1]);
                break;
            case lays[2]:
                opts.type = lays[2];
                opts.content = '<div class="jeBox-loadbox jeload' + icons + '">' + msgCell + '</div>';
                jeBox.closeAll(lays[2]);
                break;
            case lays[3]:
                opts.type = lays[3];
                jeBox.closeAll(lays[3]);
                break;
        }
        if(opts.type == lays[3]){ //tips鎻愮ず
            var tipW = $.isArray(opts.boxSize) ? opts.boxSize[0] : opts.boxSize,
                tipH = $.isArray(opts.boxSize) ? opts.boxSize[1] : opts.boxSize;
            var tipDiv = $("<div>",{"class":"jeBox-tips","id":doms[0] + idx}).css({width:tipW,height:tipH,'z-index':opts.zIndex}).css(opts.boxStyle);
            $("body").append(tipDiv.append("<em></em><div class='jeBox-tipscon'>"+opts.content+"</div>"));
            var post = $(opts.cell).offset().top, posl = $(opts.cell).offset().left,
                tiptop, tipleft, edgecolor, aligngo, spac = opts.spacing,
                selfH = $(opts.cell).outerHeight(), selfW = $(opts.cell).outerWidth(),
                tipH = tipDiv.outerHeight(true), tipW = tipDiv.outerWidth(true);
            switch (opts.align) {
                case 'top': case 'bottom':
                aligngo = opts.align == 'top' ? 'bottom' : 'top';
                edgecolor = 'border-right-color', tipleft = posl;
                tiptop = opts.align == 'top' ? (post - tipH - spac) : (post + selfH + spac);
                break;
                case 'left': case 'right':
                aligngo = opts.align == 'left' ? 'right' : 'left';
                edgecolor = 'border-bottom-color', tiptop = post;
                tipleft = opts.align == 'left' ? (posl - tipW - spac) : (posl + selfW + spac);
                break;
            }
            tipDiv.css({top:tiptop,left:tipleft});
            tipDiv.find("em").css(edgecolor,tipDiv.css('background-color')).css(aligngo,-8);
            tipDiv.attr("jetype", opts.type);
            that.btnCallback(tipDiv);
        }else {
            that.creatBox(function (cell) {
                if(msgType){
                    cell.attr("jenode", msgCell.selector.toString());
                    //鎶婂凡鐭ョ殑html鐗囨鍖呰９骞舵彃鍏ュ埌寮瑰眰涓�
                    cell.find(doms[3]).append(msgCell);
                }
                cell.attr("jetype", opts.type);
                that.setSize(cell);
                that.setPosition(cell);
                that.btnCallback(cell);
                //鏄惁鍙嫋鍔�
                if (opts.isDrag) {
                    var wrapCell = cell, titCell = cell.find(doms[2]);
                    that.dragLayer(wrapCell, titCell, 0.4, opts.shadow);
                };
            });
        }
    };
    //鍒涘缓寮瑰眰楠ㄦ灦
    jefn.creatBox = function(callback) {
        var that = this, opts = that.config, idx = that.jeidx;
        //鍒涘缓鎸夐挳妯℃澘
        var arrButton = opts.button, btnLen = arrButton.length;
        var btnHtml = function() {
            var btnStrs = btnLen != 0 ? function() {
                var btnArr = [];
                $.each(arrButton, function(i, val) {
                    btnArr.push('<button type="button" class="jeBox-btn' + i + '" jebtn="' + i + '" ' + (val.disabled == true ? "disabled" : "") + '>' + val.name + '</button>');
                });
                return btnArr.join("");
            }() : "";
            return '<div class="jeBox-footer">' + btnStrs + "</div>";
        }();
        var paddings = opts.padding, skinCell = opts.skinCell || "jeBox-anim";
        //鍒涘缓榛樿鐨勫脊鍑哄眰鍐呭妯℃澘
        var templates = '<span class="jeBox-headbtn"><a href="javascript:;" class="jeBox-maxbtn" title="鏈€澶у寲"></a><a href="javascript:;" class="jeBox-close" title="&#20851;&#38381;"></a></span>' + '<div class="jeBox-header"></div>' + '<div class="jeBox-content" style="padding:' + (paddings != "" ? paddings : 0) + ';">'+opts.content+'</div>' + btnHtml;
        //鍒涘缓寮圭獥澶栭儴DIV
        var getZindex = function(elem) {
                var maxZindex = 0;
                elem.each(function() {
                    maxZindex = Math.max(maxZindex, $(this).css("z-index"));
                });
                return maxZindex;
            },
            zIndexs = opts.zIndex;
        //璁＄畻灞傜骇骞剁疆椤�
        var Zwarp = $(doms[1]).size() > 0 ? getZindex($(doms[1])) + 5 : zIndexs + 5,
            Zmask = $(doms[1]).size() > 0 ? getZindex($(doms[1])) + 2 : zIndexs,
            divBoxs = $("<div/>", { "id": doms[0] + idx, "class": doms[1].replace(/\./g, "") });
        $("body").append(divBoxs.append(templates));
        divBoxs.attr("jeitem", idx);
        divBoxs.css({ position: opts.fixed ? "fixed" : "absolute", "z-index": Zwarp });
        (parseInt(ieBrowser) < 9) ? divBoxs.addClass("jeBox-ies"): divBoxs.addClass(skinCell);
        jeBox.zIndex = parseInt(divBoxs.css("z-index"));
        !Jeobj.scrollbar && $("body").css("overflow", "hidden");
        //鏄惁寮€鍚伄缃╁眰
        if (opts.maskLock) {
            var maskBox = $("<div/>", { "id": "jemask" + idx, "class": "jeBox-mask" }),
                maskColor = opts.maskColor;
            $("body").append(maskBox);
            maskBox.css({ left: 0, top: 0, "background-color": maskColor[0], "z-index": Zmask, opacity: maskColor[1], filter: "alpha(opacity=" + maskColor[1] * 100 + ")" })
        };
        var titles = opts.title == false ? "" : (opts.title || config.title),
            titType = typeof titles === "object", isTitle =  titles ? (titType ? titles[0] : titles) : "";
        divBoxs.find(doms[2]).html(isTitle).css({ "display": isTitle != "" ? "" : "none", "height":  isTitle != "" ? "" : "0px" }).css(titType ? titles[1] : {});
        divBoxs.find(doms[4]).css({"display": btnLen != 0 ? "block" : "none", "text-align": opts.btnAlign});
        divBoxs.find(doms[5]).css("display", opts.closeBtn ? "" : "none");
        divBoxs.find(doms[6]).css("display", opts.maxBtn ? "" : "none");
        callback && callback(divBoxs);
    };
    //璁剧疆寮瑰眰灏哄
    jefn.setSize = function(cell) {
        var that = this, opts = that.config,
            wrapWidth, wrapHeight, conWidth, conHeight,
            conCell = cell.find(doms[3]), areas = opts.boxSize,
            conPad = function(prop) { return parseInt(conCell.css(prop).replace(regPxe, "")) },
            conhead = Jeobj.conhead = cell.find(doms[2]).height(),
            confoot = Jeobj.confoot = cell.find(doms[4]).height(),
            winW = $(window).width(), winH = $(window).height(),
            Padtb = conPad("padding-top") + conPad("padding-bottom"),
            Padlr = conPad("padding-left") + conPad("padding-right"),
            Martb = conPad("margin-top") + conPad("margin-bottom"),
            Marlr = conPad("margin-left") + conPad("margin-right");
        var toSize = function (wval, fval) {
            return /^\d+%$/.test(fval.toString()) ? parseInt(wval * (fval.toString().replace("%", "") / 100)) :
                parseInt(fval.toString().replace(regPxe, ""));
        };
        if ($.isArray(areas)) {
            var fixW = areas[0], fixH = areas[1],
                bfW = toSize(winW, fixW), bfH = toSize(winH, fixH),
                nPerW = bfW >= winW ? winW : bfW,
                nPerH = bfH >= winH ? winH : bfH;
            //璁剧疆灞傜殑瀹藉害
            if ($.type(fixW) === "number") {
                wrapWidth = bfW + Padlr + Marlr;
                conWidth = bfW;
            } else if (fixW == "auto") {
                wrapWidth = cell.outerWidth(true) + Padlr + Marlr;
                conWidth = cell.outerWidth(true);
            } else {
                wrapWidth = nPerW;
                conWidth = nPerW - Padlr - Marlr;
            }

            //璁剧疆灞傜殑楂樺害
            if ($.type(fixH) === "number") {
                wrapHeight = bfH + Padtb + Martb;
                conHeight = bfH - conhead - confoot;
            } else if (fixH == "auto") {
                wrapHeight = cell.outerHeight(true);
                conHeight = cell.outerHeight(true) - Padtb - Martb - conhead - confoot;
            } else {
                wrapHeight = nPerH;
                conHeight = nPerH - Padtb - Martb - conhead - confoot;
            }
        }
        opts.maxBtn && cell.attr("area", [wrapWidth, wrapHeight, conWidth, conHeight]);
        cell.css({ "width": wrapWidth, height: wrapHeight }).css(opts.boxStyle);
        cell.find(doms[3]).css({ "width": conWidth, "height": conHeight });
    };
    //瀹氫綅灞傛樉绀虹殑浣嶇疆
    jefn.setPosition = function(cell) {
        var that = this, opts = that.config,
            Postr, elemtr, elembl, offsets = opts.offset,
            isOffsetArr = $.isArray(offsets),
            eleW = cell.width(), eleH = cell.height(),
            Postr = offsets[0], Posbl = offsets[1],
            winWidth = $(window).width(),
            winHeight = $(window).height();
        //璁剧疆浣嶇疆
        elemtr = (isOffsetArr && /^\@/.test(Postr)) ? Postr.replace(/\@/g, "") :
            ((Postr == "auto") ? (winHeight - eleH) / 2 : /^\d+%$/.test(Postr) ? Postr : Postr.replace(regPxe, ""));
        elembl = (isOffsetArr && /^\@/.test(Posbl)) ? Posbl.replace(/\@/g, "") :
            ((Posbl == "auto") ? (winWidth - eleW) / 2 : /^\d+%$/.test(Posbl) ? Posbl : Posbl.replace(regPxe, ""));
        //鍒ゆ柇璁剧疆浣嶇疆绫诲瀷
        cell.css( (isOffsetArr && (/^\@/.test(Postr) || /^\@/.test(Posbl))) ? { "right": elemtr, "bottom": elembl } : { "top": elemtr, "left": elembl });
        if(opts.maxBtn){
            cell.attr("offset", [elemtr, elembl]);
        }
    };
    //鍚勫叧闂寜閽殑浜嬩欢
    jefn.btnCallback = function(cell) {
        var that = this,
            opts = that.config,
            idx = that.jeidx,
            maxBtn = cell.find(doms[6]),
            times = opts.time,
            btns = opts.button,
            offsets = opts.offset;
        if (opts.success) {
            if (opts.type == "iframe") {
                cell.find("iframe").on("load", function() {
                    config.success(cell, idx);
                });
            } else {
                opts.success(cell, idx);
            }
        };
        if (opts.type != "tips") {
            // 鎸夐挳闃熷垪
            if (!$.isArray(btns)) btns = btns ? [btns] : [];
            //鑷姩鍏抽棴
            times <= 0 || setTimeout(function () {
                jeBox.close(idx);
            }, times * 1e3);

            //鍏抽棴鎸夐挳浜嬩欢
            if (opts.closeBtn) {
                cell.find(doms[5]).on("click", function () {
                    var close = opts.closefun && opts.closefun(idx);
                    close === false || jeBox.close(idx);
                });
            }
            //鏈€澶у寲鎸夐挳
            if (opts.maxBtn) {
                maxBtn.bind("click", function () {
                    if (maxBtn.hasClass("revert")) {
                        maxBtn.removeClass("revert");
                        jeBox.restore(idx);
                        $(this).attr("title", "鏈€澶у寲");
                    } else {
                        maxBtn.addClass("revert");
                        jeBox.full(idx);
                        $(this).attr("title", "杩樺師");
                    }
                });
            }
            //鏇村鎸夐挳
            if (btns.length > 0) {
                cell.find(doms[4] + " button").on("click", function () {
                    var index = parseInt($(this).attr("jebtn"));
                    if (index === 0) {
                        btns[0]["callback"] ? btns[0]["callback"](idx, cell) : jeBox.close(idx, cell);
                    } else if (index > 0) {
                        var close = btns[index]["callback"] && btns[index]["callback"](idx, cell);
                        close === false || jeBox.close(idx);
                    }
                });
            }
            //鐐归伄缃╁叧闂�
            if (opts.maskClose) {
                $("#jemask" + idx).on("click", function () {
                    jeBox.close(idx);
                });
            }
            //鑷€傚簲
            $(window).resize(function () {
                if ($.isArray(offsets) && (/^\@/.test(offsets[0]) || /^\@/.test(offsets[1]))) {
                    cell.css({"top": "", "left": ""});
                }
                that.setPosition(cell);
            });
        }
        opts.endfun && (Jeobj.endfun[idx] = opts.endfun);
    };
    //鎷栨嫿浜嬩欢
    jefn.dragLayer = function (warpCell, titCell, opacityVal, isShadow) {
        var that = this, isIES = !-[1];
        titCell = titCell || warpCell;
        var tmpX = tmpY = 0;
        that.isMoveable = false;
        titCell.css("cursor", "move");
        if (isShadow) {
            that.isShadow = isShadow ? isShadow == true || isShadow == false ? isShadow : false : false;
            if (that.isShadow) that.opacity = opacityVal;
        } else {
            that.opacity = 100, that.isShadow = false;
        }
        titCell.on("mousedown", function(event) {
            var event = event || window.event;
            var tempLayer = $("<div/>",{"id":"jeBox-moves","class":"jeBox-moves"}),
                warpLeft = warpCell.css("left"), warpTop = warpCell.css("top");
            var tempLayerCon = $("<div/>",{class:"movescon"});
            //鍙厑璁搁€氳繃榧犳爣宸﹂敭杩涜鎷栨嫿,IE榧犳爣宸﹂敭涓�1 FireFox涓�0
            if (isIES && event.button != 1 || isIES && event.button == 0) return false;
            //鍒涘缓涓存椂鎷栧姩灞�
            if (that.isShadow) {
                tempLayer.css({
                    width :(warpCell.outerWidth() - 4), height : (warpCell.outerHeight() - 4),
                    left : warpLeft, top : warpTop, "z-index" : parseInt(warpCell.css("z-index")) + 10
                });
                $("body").append(tempLayer.append(tempLayerCon));
            }
            that.isMoveable = true;
            tmpX = event.pageX - warpLeft.replace(regPxe, "");
            tmpY = event.pageY - warpTop.replace(regPxe, "");
            //FireFox 鍘婚櫎瀹瑰櫒鍐呮嫋鎷藉浘鐗囬棶棰�
            if (event.preventDefault) {
                event.preventDefault();  event.stopPropagation();
            }
            $(document).on("mousemove", function (event) {
                if (!that.isMoveable) return;
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                //鎺у埗鍏冪礌涓嶈鎷栧嚭绐楀彛澶�
                var event = event || window.event, elemCopy = that.isShadow ? tempLayer : warpCell,
                    DmpX = event.pageX - tmpX, DmpY = event.pageY - tmpY,
                    maxW = $(window).width() - warpCell.outerWidth(), maxH = $(window).height() - warpCell.outerHeight();
                DmpX <= 0 && (DmpX = 0);   DmpY <= 0 && (DmpY = 0);
                DmpX >= maxW && (DmpX = maxW);  DmpY >= maxH && (DmpY = maxH);
                elemCopy.css({"top": DmpY, "left": DmpX});
            }).on("mouseup", function () {
                if (that.isMoveable) {
                    that.isMoveable = false;
                    tmpX = tmpY = 0;
                    warpCell.css({"right": "", "bottom": ""});
                    if (that.isShadow) {
                        //鍒ゆ柇骞舵妸铏氭鐨勪綅缃俊鎭紶缁欏脊灞�
                        warpCell.css({ "top": tempLayer.css("top"), "left": tempLayer.css("left") });
                        //鍒ゆ柇骞跺垹闄ゆ柊鍒涘缓鐨勮櫄妗�
                        $("#jeBox-moves").remove();
                    }
                    if ($(window).width() != warpCell.outerWidth()) {
                        warpCell.attr("offset", [warpCell.css("top").replace(regPxe, ""), warpCell.css("left").replace(regPxe, "")]);
                    }
                }
            });
        });
    };
    // 璁╀紶鍏ョ殑鍏冪礌鍦ㄥ璇濇鍏抽棴鍚庡彲浠ヨ繑鍥炲埌鍘熸潵鐨勫湴鏂�
    Jeobj.backInSitu = function (elem, jePrev, jeNext, jeParent, jeDispy) {
        if (jePrev.length > 0 && jePrev.parent()) {
            jePrev.after(elem);
        } else if (jeNext.length > 0 && jeNext.parent()) {
            jeNext.before(elem);
        } else if (jeParent.length > 0) {
            jeParent.append(elem);
        }
        elem.css("display", jeDispy);
        //this.backInSitu = null;
    };
    //寮瑰眰鏍稿績
    jeBox.open = function (opts) {
        var jeShow = new jeDialog(opts || {});
        return jeShow.jeidx;
    };
    //鍏抽棴鎸囧畾灞�
    jeBox.close = function (idx) {
        var boxCell = $("#" + doms[0] + idx), maskCell = $("#jemask" + idx);
        var nodeCell = boxCell.attr("jenode"),
            arr = ["prev"+idx,"next"+idx,"parent"+idx,"dispy"+idx];
        if(!boxCell) return;
        if ($(nodeCell).size() > 0 && $(nodeCell)[0].nodeType === 1) {
            Jeobj.backInSitu($(nodeCell), Jeobj[arr[0]], Jeobj[arr[1]], Jeobj[arr[2]], Jeobj[arr[3]]);
        };
        boxCell && boxCell.remove();
        maskCell && maskCell.remove();
        $("body").css("overflow") == "hidden" && $("body").css("overflow", "");
        $.each(arr,function (i,val) {
            delete Jeobj[val];
        });
        typeof Jeobj.endfun[idx] === 'function' && Jeobj.endfun[idx]();
        delete Jeobj.endfun[idx];
    };
    //鍏抽棴鎵€鏈夊眰
    jeBox.closeAll = function (type) {
        $.each($(doms[1]), function () {
            var that = $(this);
            var istype = type ? (that.attr('jetype') === type) : 1;
            istype && jeBox.close(parseInt(that.attr("jeitem")));
            istype = null;
        });
    };
    //鏈€甯哥敤鎻愮ず灞�
    jeBox.msg = function (content, options, end) {
        var type = $.isFunction(options);
        if (type) end = options;
        return jeBox.open($.extend({
            title: false,
            content: content,
            padding: "10px",
            skinCell: "jeBox-animMsg",
            time: 3,
            maskLock: false,
            closeBtn: false,
            end: end
        }, !type && function () {
            options = options || {};
            return options;
        }()));
    };
    jeBox.alert = function (content, options, yes) {
        var type = $.isFunction(options);
        if (type) yes = options;
        return jeBox.open($.extend({
            content: content,
            button:[{name: '纭畾', callback:yes}]
        }, type ? {} : options));
    };
    jeBox.loading = function (icon, content, options) {
        return jeBox.open($.extend({
            title: false,
            closeBtn: false,
            type: 'loading',
            skinCell: "jeBox-animLoad",
            maskLock: false,
            content: content == undefined ? "" : content,
            icon: icon || 1
        }, options));
    };
    //tip鎻愮ず娉℃场
    jeBox.tips = function (cell,content,options) {
        return jeBox.open( $.extend({
            cell: cell,
            type: 'tips',
            content: content == undefined ? "" : content,
            align:"top",            //鎻愮ず灞傜殑绠ご鏂瑰悜
            boxStyle:{'background-color':"#5eb95e"},         //鎻愮ず灞傜殑椋庢牸锛屽弬鏁颁负鎻愮ず杈规棰滆壊
            spacing:10              //榛樿涓虹澶磋窛绂诲璞＄殑灏哄
        },options||{}));
    };
    //鏀瑰彉褰撳墠寮瑰眰title
    jeBox.title = function (name, idx) {
        $("#" + doms[0] + idx).find(doms[2]).html(name);
    };
    //鏀瑰彉褰撳墠寮瑰眰鍐呭
    jeBox.content = function (content, idx) {
        $("#" + doms[0] + idx).find(doms[3]).html(content);
    };
    //杩樺師
    jeBox.restore = function (index) {
        var boxCell = $("#" + doms[0] + index), conCell = boxCell.find(doms[3]),
            revArea = boxCell.attr("area").split(/,/g), revOffset = boxCell.attr("offset").split(/,/g);
        $("body").css('overflow', Jeobj.scrollbar == false ? 'hidden' : '');
        boxCell.css({
            width: revArea[0], height: revArea[1], top: revOffset[0] + "px", left: revOffset[1] + "px", right: "", bottom: ""
        });
        conCell.css({width: revArea[2], height: revArea[3]});
    };
    //鍏ㄥ睆
    jeBox.full = function (index) {
        var timer, boxCell = $("#" + doms[0] + index),
            conCell = boxCell.find(doms[3]);
        $("body").css('overflow', 'hidden');
        clearTimeout(timer);
        timer = setTimeout(function () {
            boxCell.find(doms[6]).addClass("revert");
            var isfix = boxCell.css('position') === 'fixed', offset = boxCell.attr("offset").split(","),
                docWidth = $(window).width(), docHeight = $(window).height(),
                conW = conCell.outerWidth(true) - conCell.width(), conH = conCell.outerHeight(true) - conCell.height(),
                headHeight = boxCell.find(doms[2]).outerHeight(true), footHeight = boxCell.find(doms[4]).outerHeight(true);
            boxCell.css({
                width: docWidth, height: docHeight,
                top: isfix ? 0 : offset[0], left: isfix ? 0 : offset[1], right: "", bottom: ""
            });
            conCell.css({
                width: docWidth - conW,
                height: docHeight - conH - headHeight - footHeight
            });
        }, 50);
    };
    //鑾峰彇瀛恑frame鐨凞OM
    jeBox.frameCell = function (selector, index) {
        index = index || $(".jeboxiframe").attr("jeitem");
        return $("#" + doms[0] + index).find("iframe").contents().find(selector);
    };
    //寰楀埌褰撳墠iframe灞傜殑绱㈠紩锛屽瓙iframe鏃朵娇鐢�
    jeBox.frameIndex = function (name) {
        return $("#" + doms[0] + name).attr("jeitem");
    };
    //閲嶇疆iframe url
    jeBox.frameUrl = function (idx, url) {
        $("#" + doms[0] + idx).find("iframe").attr("src", url);
    };

    return jeBox
});