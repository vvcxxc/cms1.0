var head;
var rehead;
var datanum;
var wantdata = [];
var daochuend = 0;
var clonetable;
var firsttable = 1;
var savetable = [];
var footarr = []
var hhh;
var d = { "kzdirection": "纵向扩展", "kzarea": "A1:K11", "startpox": "0", "startpoy": "0", "endpox": "10", "endpoy": "10", "kzresource": "统计归档", "kzresourceid": null, "kzsummotype": "sum,mean,min,max", "kzsummopos": "分布在后", "kztimewd": "日", "kzbanciwd": "全部", "kzresourcedataitemarray": [{ "id": "0-0", "itemtype": "辅助项", "itemdata": "序号", "itemformat": null, "xsnumber": "0", "defauldisplay": null }, { "id": "1-0", "itemtype": "辅助项", "itemdata": "归档时间", "itemformat": "yyyy-MM-dd HH:mm:ss", "xsnumber": "0", "defauldisplay": null }, { "id": "2-0", "itemtype": "辅助项", "itemdata": "班次", "itemformat": "yyyy-MM-dd HH:mm:ss", "xsnumber": "0", "defauldisplay": null }, { "id": "3-0", "itemtype": "数据项", "itemdata": "A1", "itemformat": null, "xsnumber": "0", "defauldisplay": null }, { "id": "4-0", "itemtype": "数据项", "itemdata": "A2", "itemformat": null, "xsnumber": "0", "defauldisplay": null }, { "id": "5-0", "itemtype": "数据项", "itemdata": "B1", "itemformat": null, "xsnumber": "0", "defauldisplay": null }, { "id": "6-0", "itemtype": "数据项", "itemdata": "B2", "itemformat": null, "xsnumber": "0", "defauldisplay": null }, { "id": "7-0", "itemtype": "数据项", "itemdata": "A9", "itemformat": null, "xsnumber": "2", "defauldisplay": null }, { "id": "8-0", "itemtype": "数据项", "itemdata": "B9", "itemformat": null, "xsnumber": "2", "defauldisplay": null }, { "id": "9-0", "itemtype": "数据项", "itemdata": "A10", "itemformat": null, "xsnumber": "2", "defauldisplay": null }, { "id": "10-0", "itemtype": "数据项", "itemdata": "B10", "itemformat": null, "xsnumber": "2", "defauldisplay": null }], "cellparaarray": [], "cfkongjian": "QueryButton58", "dckongjian": null, "startkongjian": "T1", "endkongjian": "T2", "timekongjian": null, "xialakongjian": null, "wenbenkongjian": null, "kopngjianarray": [], "zhtml": "\n\t\t\t\t<div class=\"stylecover\" onclick=\"scover()\" style=\"display: none;\"></div>\n\t\t\t<div class=\"mycover2\" onmouseup=\"mouseup()\" style=\"display: block;\"></div>\n\t\t<div class=\"jexcel-content\"><hr id=\"hengxian\" class=\"reportdata-hr\" style=\"border: 1px dashed rgb(248, 181, 81); position: absolute; top: 392px; left: 30px; display: block; z-index: 9999; width: 1900px; background-color: transparent; height: 0px;\"><div id=\"shuxian\" style=\"height: 1110px; position: absolute; display: block; left: 980px; top: 0px; border: 1px dashed rgb(248, 181, 81);\"></div><table cellpadding=\"0\" cellspacing=\"0\" style=\"width: 980px; height: 392px;\"><colgroup><col width=\"50\"><col width=\"120\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"></colgroup><tbody><tr id=\"row-0\" class=\"selected\"><td class=\"jexcel_label\" style=\"left: 0px; cursor: all-scroll; display: none;\">1</td><td width=\"50\" align=\"center\" id=\"0-0\" class=\"datareadyhead r0 c0 readonly\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19); border-left: 1px solid rgb(82, 218, 245);\">序号</td><td width=\"50\" align=\"center\" id=\"1-0\" class=\"datareadyhead r0 c1 readonly\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">归档时间</td><td width=\"50\" align=\"center\" id=\"2-0\" class=\"datareadyhead r0 c2\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">班次</td><td width=\"50\" align=\"center\" id=\"3-0\" class=\"datareadyhead r0 c3\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">A1</td><td width=\"50\" align=\"center\" id=\"4-0\" class=\"datareadyhead r0 c4\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">A2</td><td width=\"50\" align=\"center\" id=\"5-0\" class=\"datareadyhead r0 c5\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">B1</td><td width=\"50\" align=\"center\" id=\"6-0\" class=\"datareadyhead r0 c6\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">B2</td><td width=\"50\" align=\"center\" id=\"7-0\" class=\"datareadyhead r0 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">A9</td><td width=\"50\" align=\"center\" id=\"8-0\" class=\"datareadyhead r0 c8\" style=\"border-right: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\" b=\"\" wai=\"\">B9</td><td width=\"50\" align=\"center\" id=\"9-0\" class=\"datareadyhead r0 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\" b=\"\" wai=\"\">A10</td><td width=\"50\" align=\"center\" id=\"10-0\" class=\"datareadyhead r0 c10 highlight highlight-left highlight-right highlight-top highlight-bottom\" style=\"border-right: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\" b=\"\" wai=\"\">B10</td><td width=\"50\" align=\"center\" id=\"11-0\" class=\"r0 c11\"></td><td width=\"50\" align=\"center\" id=\"12-0\" class=\"r0 c12\"></td><td width=\"50\" align=\"center\" id=\"13-0\" class=\"r0 c13\"></td></tr><tr id=\"row-1\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">2</td><td width=\"50\" align=\"center\" id=\"0-1\" class=\"dataready readonly r1 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-1\" class=\"dataready readonly r1 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-1\" class=\"dataready readonly r1 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-1\" class=\"dataready readonly r1 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-1\" class=\"dataready readonly r1 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-1\" class=\"dataready readonly r1 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-1\" class=\"dataready readonly r1 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-1\" class=\"dataready readonly r1 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-1\" class=\"dataready r1 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-1\" class=\"dataready readonly r1 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-1\" class=\"dataready r1 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-1\" class=\"r1 c11\"></td><td width=\"50\" align=\"center\" id=\"12-1\" class=\"r1 c12\"></td><td width=\"50\" align=\"center\" id=\"13-1\" class=\"r1 c13\"></td></tr><tr id=\"row-2\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">3</td><td width=\"50\" align=\"center\" id=\"0-2\" class=\"dataready readonly r2 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-2\" class=\"dataready readonly r2 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-2\" class=\"dataready readonly r2 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-2\" class=\"dataready readonly r2 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-2\" class=\"dataready readonly r2 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-2\" class=\"dataready readonly r2 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-2\" class=\"dataready readonly r2 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-2\" class=\"dataready readonly r2 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-2\" class=\"dataready r2 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-2\" class=\"dataready readonly r2 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-2\" class=\"dataready r2 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-2\" class=\"r2 c11\"></td><td width=\"50\" align=\"center\" id=\"12-2\" class=\"r2 c12\"></td><td width=\"50\" align=\"center\" id=\"13-2\" class=\"r2 c13\"></td></tr><tr id=\"row-3\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">4</td><td width=\"50\" align=\"center\" id=\"0-3\" class=\"dataready readonly r3 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-3\" class=\"dataready readonly r3 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-3\" class=\"dataready readonly r3 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-3\" class=\"dataready readonly r3 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-3\" class=\"dataready readonly r3 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-3\" class=\"dataready readonly r3 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-3\" class=\"dataready readonly r3 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-3\" class=\"dataready readonly r3 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-3\" class=\"dataready r3 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-3\" class=\"dataready readonly r3 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-3\" class=\"dataready r3 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-3\" class=\"r3 c11\"></td><td width=\"50\" align=\"center\" id=\"12-3\" class=\"r3 c12\"></td><td width=\"50\" align=\"center\" id=\"13-3\" class=\"r3 c13\"></td></tr><tr id=\"row-4\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">5</td><td width=\"50\" align=\"center\" id=\"0-4\" class=\"dataready readonly r4 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-4\" class=\"dataready readonly r4 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-4\" class=\"dataready readonly r4 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-4\" class=\"dataready readonly r4 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-4\" class=\"dataready readonly r4 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-4\" class=\"dataready readonly r4 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-4\" class=\"dataready readonly r4 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-4\" class=\"dataready readonly r4 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-4\" class=\"dataready r4 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-4\" class=\"dataready readonly r4 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-4\" class=\"dataready r4 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-4\" class=\"r4 c11\"></td><td width=\"50\" align=\"center\" id=\"12-4\" class=\"r4 c12\"></td><td width=\"50\" align=\"center\" id=\"13-4\" class=\"r4 c13\"></td></tr><tr id=\"row-5\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">6</td><td width=\"50\" align=\"center\" id=\"0-5\" class=\"dataready readonly r5 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-5\" class=\"dataready readonly r5 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-5\" class=\"dataready readonly r5 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-5\" class=\"dataready readonly r5 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-5\" class=\"dataready readonly r5 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-5\" class=\"dataready readonly r5 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-5\" class=\"dataready readonly r5 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-5\" class=\"dataready readonly r5 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-5\" class=\"dataready r5 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-5\" class=\"dataready readonly r5 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-5\" class=\"dataready r5 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-5\" class=\"r5 c11\"></td><td width=\"50\" align=\"center\" id=\"12-5\" class=\"r5 c12\"></td><td width=\"50\" align=\"center\" id=\"13-5\" class=\"r5 c13\"></td></tr><tr id=\"row-6\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">7</td><td width=\"50\" align=\"center\" id=\"0-6\" class=\"dataready readonly r6 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-6\" class=\"dataready readonly r6 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-6\" class=\"dataready readonly r6 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-6\" class=\"dataready readonly r6 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-6\" class=\"dataready readonly r6 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-6\" class=\"dataready readonly r6 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-6\" class=\"dataready readonly r6 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-6\" class=\"dataready readonly r6 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-6\" class=\"dataready r6 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-6\" class=\"dataready readonly r6 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-6\" class=\"dataready r6 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-6\" class=\"r6 c11\"></td><td width=\"50\" align=\"center\" id=\"12-6\" class=\"r6 c12\"></td><td width=\"50\" align=\"center\" id=\"13-6\" class=\"r6 c13\"></td></tr><tr id=\"row-7\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">8</td><td width=\"50\" align=\"center\" id=\"0-7\" class=\"datareadyfoot r7 c0\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6); border-left: 1px solid rgb(82, 218, 245);\" type=\"sum\" colspan=\"1\" rowspan=\"1\">合计</td><td width=\"50\" align=\"center\" id=\"1-7\" class=\"datareadyfoot readonly r7 c1\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"2-7\" class=\"datareadyfoot readonly r7 c2\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"3-7\" class=\"datareadyfoot readonly r7 c3\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"4-7\" class=\"datareadyfoot readonly r7 c4\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"5-7\" class=\"datareadyfoot readonly r7 c5\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"6-7\" class=\"datareadyfoot readonly r7 c6\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"7-7\" class=\"datareadyfoot readonly r7 c7\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"8-7\" class=\"datareadyfoot readonly r7 c8\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-7\" class=\"datareadyfoot readonly r7 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-7\" class=\"datareadyfoot r7 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-7\" class=\"r7 c11\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"12-7\" class=\"r7 c12\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"13-7\" class=\"r7 c13\" b=\"\" wai=\"\" style=\"\"></td></tr><tr id=\"row-8\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">9</td><td width=\"50\" align=\"center\" id=\"0-8\" class=\"datareadyfoot r8 c0\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6); border-left: 1px solid rgb(82, 218, 245);\" type=\"mean\" colspan=\"1\" rowspan=\"1\">平均</td><td width=\"50\" align=\"center\" id=\"1-8\" class=\"datareadyfoot readonly r8 c1\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"2-8\" class=\"datareadyfoot readonly r8 c2\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"3-8\" class=\"datareadyfoot readonly r8 c3\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"4-8\" class=\"datareadyfoot readonly r8 c4\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"5-8\" class=\"datareadyfoot readonly r8 c5\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"6-8\" class=\"datareadyfoot readonly r8 c6\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"7-8\" class=\"datareadyfoot readonly r8 c7\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"8-8\" class=\"datareadyfoot readonly r8 c8\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-8\" class=\"datareadyfoot readonly r8 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-8\" class=\"datareadyfoot r8 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-8\" class=\"r8 c11\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"12-8\" class=\"r8 c12\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"13-8\" class=\"r8 c13\" b=\"\" wai=\"\" style=\"\"></td></tr><tr id=\"row-9\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">10</td><td width=\"50\" align=\"center\" id=\"0-9\" class=\"datareadyfoot r9 c0\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6); border-left: 1px solid rgb(82, 218, 245);\" type=\"min\" colspan=\"1\" rowspan=\"1\">最小</td><td width=\"50\" align=\"center\" id=\"1-9\" class=\"datareadyfoot readonly r9 c1\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"2-9\" class=\"datareadyfoot readonly r9 c2\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"3-9\" class=\"datareadyfoot readonly r9 c3\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"4-9\" class=\"datareadyfoot readonly r9 c4\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"5-9\" class=\"datareadyfoot readonly r9 c5\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"6-9\" class=\"datareadyfoot readonly r9 c6\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"7-9\" class=\"datareadyfoot readonly r9 c7\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"8-9\" class=\"datareadyfoot readonly r9 c8\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-9\" class=\"datareadyfoot readonly r9 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-9\" class=\"datareadyfoot r9 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-9\" class=\"r9 c11\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"12-9\" class=\"r9 c12\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"13-9\" class=\"r9 c13\" b=\"\" wai=\"\" style=\"\"></td></tr><tr id=\"row-10\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">11</td><td width=\"50\" align=\"center\" id=\"0-10\" class=\"datareadyfoot r10 c0\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6); border-left: 1px solid rgb(82, 218, 245);\" type=\"max\" colspan=\"1\" rowspan=\"1\">最大</td><td width=\"50\" align=\"center\" id=\"1-10\" class=\"datareadyfoot r10 c1 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"2-10\" class=\"datareadyfoot r10 c2 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"3-10\" class=\"datareadyfoot r10 c3 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"4-10\" class=\"datareadyfoot r10 c4 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"5-10\" class=\"datareadyfoot r10 c5 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"6-10\" class=\"datareadyfoot r10 c6 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"7-10\" class=\"datareadyfoot readonly r10 c7\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"8-10\" class=\"datareadyfoot readonly r10 c8\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-10\" class=\"datareadyfoot readonly r10 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-10\" class=\"datareadyfoot r10 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-10\" class=\"r10 c11\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"12-10\" class=\"r10 c12\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"13-10\" class=\"r10 c13\" b=\"\" wai=\"\" style=\"\"></td></tr><tr id=\"row-11\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">12</td><td width=\"50\" align=\"center\" id=\"0-11\" class=\"r11 c0\"></td><td width=\"50\" align=\"center\" id=\"1-11\" class=\"r11 c1\"></td><td width=\"50\" align=\"center\" id=\"2-11\" class=\"r11 c2\"></td><td width=\"50\" align=\"center\" id=\"3-11\" class=\"r11 c3\"></td><td width=\"50\" align=\"center\" id=\"4-11\" class=\"r11 c4\"></td><td width=\"50\" align=\"center\" id=\"5-11\" class=\"r11 c5\"></td><td width=\"50\" align=\"center\" id=\"6-11\" class=\"r11 c6\"></td><td width=\"50\" align=\"center\" id=\"7-11\" class=\"r11 c7\"></td><td width=\"50\" align=\"center\" id=\"8-11\" class=\"r11 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-11\" class=\"r11 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-11\" class=\"r11 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-11\" class=\"r11 c11\"></td><td width=\"50\" align=\"center\" id=\"12-11\" class=\"r11 c12\"></td><td width=\"50\" align=\"center\" id=\"13-11\" class=\"r11 c13\"></td></tr><tr id=\"row-12\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px; display: none;\">13</td><td width=\"50\" align=\"center\" id=\"0-12\" class=\"r12 c0\"></td><td width=\"50\" align=\"center\" id=\"1-12\" class=\"r12 c1\"></td><td width=\"50\" align=\"center\" id=\"2-12\" class=\"r12 c2\"></td><td width=\"50\" align=\"center\" id=\"3-12\" class=\"r12 c3\"></td><td width=\"50\" align=\"center\" id=\"4-12\" class=\"r12 c4\"></td><td width=\"50\" align=\"center\" id=\"5-12\" class=\"r12 c5\"></td><td width=\"50\" align=\"center\" id=\"6-12\" class=\"r12 c6\"></td><td width=\"50\" align=\"center\" id=\"7-12\" class=\"r12 c7\"></td><td width=\"50\" align=\"center\" id=\"8-12\" class=\"r12 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-12\" class=\"r12 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-12\" class=\"r12 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-12\" class=\"r12 c11\"></td><td width=\"50\" align=\"center\" id=\"12-12\" class=\"r12 c12\"></td><td width=\"50\" align=\"center\" id=\"13-12\" class=\"r12 c13\"></td></tr></tbody></table></div>", "zzhtml": "\n\t\t\t\t<div class=\"stylecover\" onclick=\"scover()\" style=\"display: none;\"></div>\n\t\t\t<div class=\"mycover2\" onmouseup=\"mouseup()\" style=\"display: block;\"></div>\n\t\t<div class=\"jexcel-header\"><table cellpadding=\"0\" cellspacing=\"0\"><colgroup><col width=\"30\"><col width=\"50\"><col width=\"120\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"></colgroup><thead class=\"jexcel_label\"><tr class=\"jexcel_headers_nested\"></tr><tr class=\"jexcel_headers\"><td></td><td id=\"col-0\" align=\"center\" title=\"\" class=\"\" style=\"\">A</td><td id=\"col-1\" align=\"center\" title=\"\" class=\"\" style=\"\">B</td><td id=\"col-2\" align=\"center\" title=\"\" class=\"\" style=\"cursor: col-resize;\">C</td><td id=\"col-3\" align=\"center\" title=\"\" class=\"\" style=\"cursor: col-resize;\">D</td><td id=\"col-4\" align=\"center\" title=\"\" class=\"\" style=\"cursor: col-resize;\">E</td><td id=\"col-5\" align=\"center\" title=\"\" class=\"\" style=\"cursor: col-resize;\">F</td><td id=\"col-6\" align=\"center\" title=\"\" class=\"\" style=\"cursor: col-resize;\">G</td><td id=\"col-7\" align=\"center\" title=\"\" class=\"\" style=\"cursor: col-resize;\">H</td><td align=\"center\" title=\"\" class=\"\" id=\"col-8\">I</td><td align=\"center\" title=\"\" class=\"\" id=\"col-9\" style=\"\">J</td><td align=\"center\" title=\"\" class=\"selected\" id=\"col-10\">K</td><td id=\"col-11\" align=\"center\" title=\"\" class=\"\">L</td><td id=\"col-12\" align=\"center\" title=\"\" class=\"\">M</td><td id=\"col-13\" align=\"center\" title=\"\" class=\"\" style=\"cursor: col-resize;\">N</td><td id=\"col-14\" align=\"center\" title=\"\" class=\"\">O</td><td id=\"col-15\" align=\"center\" title=\"\" class=\"\">P</td><td id=\"col-16\" align=\"center\" title=\"\" class=\"\">Q</td><td id=\"col-17\" align=\"center\" title=\"\" class=\"\">R</td><td id=\"col-18\" align=\"center\" title=\"\" class=\"\">S</td><td id=\"col-19\" align=\"center\" title=\"\" class=\"\">T</td><td id=\"col-20\" align=\"center\" title=\"\" class=\"\">U</td><td id=\"col-21\" align=\"center\" title=\"\" class=\"\">V</td><td id=\"col-22\" align=\"center\" title=\"\" class=\"\" style=\"cursor: col-resize;\">W</td><td id=\"col-23\" align=\"center\" title=\"\" class=\"\">X</td><td id=\"col-24\" align=\"center\" title=\"\" class=\"\">Y</td><td id=\"col-25\" align=\"center\" title=\"\" class=\"\">Z</td><td id=\"col-26\" align=\"center\" title=\"\" class=\"\">AA</td><td id=\"col-27\" align=\"center\" title=\"\" class=\"\">AB</td><td id=\"col-28\" align=\"center\" title=\"\" class=\"\" style=\"cursor: col-resize;\">AC</td><td id=\"col-29\" align=\"center\" title=\"\" class=\"\">AD</td><td id=\"col-30\" align=\"center\" title=\"\" class=\"\">AE</td><td id=\"col-31\" align=\"center\" title=\"\" class=\"\">AF</td><td id=\"col-32\" align=\"center\" title=\"\" class=\"\">AG</td><td id=\"col-33\" align=\"center\" title=\"\" class=\"\">AH</td><td id=\"col-34\" align=\"center\" title=\"\" class=\"\" style=\"cursor: col-resize;\">AI</td><td id=\"col-35\" align=\"center\" title=\"\" class=\"\">AJ</td><td id=\"col-36\" align=\"center\" title=\"\" class=\"\">AK</td><td id=\"col-37\" align=\"center\" title=\"\" class=\"\">AL</td><td id=\"col-38\" align=\"center\" title=\"\" class=\"\">AM</td><td id=\"col-39\" align=\"center\" title=\"\" class=\"\">AN</td><td id=\"col-40\" align=\"center\" title=\"\" class=\"\">AO</td></tr></thead></table></div><div class=\"jexcel-content\"><hr id=\"hengxian\" class=\"reportdata-hr\" style=\"border: 1px dashed rgb(248, 181, 81); position: absolute; top: 392px; left: 30px; display: block; z-index: 9999; width: 1900px; background-color: transparent; height: 0px;\"><div id=\"shuxian\" style=\"height: 1110px; position: absolute; display: block; left: 980px; top: 0px; border: 1px dashed rgb(248, 181, 81);\"></div><table cellpadding=\"0\" cellspacing=\"0\"><colgroup><col width=\"30\"><col width=\"50\"><col width=\"120\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"70\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"><col width=\"50\"></colgroup><tbody><tr id=\"row-0\" class=\"selected\"><td class=\"jexcel_label\" style=\"left: 0px; cursor: all-scroll;\">1</td><td width=\"50\" align=\"center\" id=\"0-0\" class=\"datareadyhead r0 c0 readonly\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19); border-left: 1px solid rgb(82, 218, 245);\">序号</td><td width=\"50\" align=\"center\" id=\"1-0\" class=\"datareadyhead r0 c1 readonly\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">归档时间</td><td width=\"50\" align=\"center\" id=\"2-0\" class=\"datareadyhead r0 c2\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">班次</td><td width=\"50\" align=\"center\" id=\"3-0\" class=\"datareadyhead r0 c3\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">A1</td><td width=\"50\" align=\"center\" id=\"4-0\" class=\"datareadyhead r0 c4\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">A2</td><td width=\"50\" align=\"center\" id=\"5-0\" class=\"datareadyhead r0 c5\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">B1</td><td width=\"50\" align=\"center\" id=\"6-0\" class=\"datareadyhead r0 c6\" style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">B2</td><td width=\"50\" align=\"center\" id=\"7-0\" class=\"datareadyhead r0 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\">A9</td><td width=\"50\" align=\"center\" id=\"8-0\" class=\"datareadyhead r0 c8\" style=\"border-right: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\" b=\"\" wai=\"\">B9</td><td width=\"50\" align=\"center\" id=\"9-0\" class=\"datareadyhead r0 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\" b=\"\" wai=\"\">A10</td><td width=\"50\" align=\"center\" id=\"10-0\" class=\"datareadyhead r0 c10 highlight highlight-left highlight-right highlight-top highlight-bottom\" style=\"border-right: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-top: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(19, 19, 19);\" b=\"\" wai=\"\">B10</td><td width=\"50\" align=\"center\" id=\"11-0\" class=\"r0 c11\"></td><td width=\"50\" align=\"center\" id=\"12-0\" class=\"r0 c12\"></td><td width=\"50\" align=\"center\" id=\"13-0\" class=\"r0 c13\"></td><td width=\"50\" align=\"center\" id=\"14-0\" class=\"r0 c14\"></td><td width=\"50\" align=\"center\" id=\"15-0\" class=\"r0 c15\"></td><td width=\"50\" align=\"center\" id=\"16-0\" class=\"r0 c16\"></td><td width=\"50\" align=\"center\" id=\"17-0\" class=\"r0 c17\"></td><td width=\"50\" align=\"center\" id=\"18-0\" class=\"r0 c18\"></td><td width=\"50\" align=\"center\" id=\"19-0\" class=\"r0 c19\"></td><td width=\"50\" align=\"center\" id=\"20-0\" class=\"r0 c20\"></td><td width=\"50\" align=\"center\" id=\"21-0\" class=\"r0 c21\"></td><td width=\"50\" align=\"center\" id=\"22-0\" class=\"r0 c22\"></td><td width=\"50\" align=\"center\" id=\"23-0\" class=\"r0 c23\"></td><td width=\"50\" align=\"center\" id=\"24-0\" class=\"r0 c24\"></td><td width=\"50\" align=\"center\" id=\"25-0\" class=\"r0 c25\"></td><td width=\"50\" align=\"center\" id=\"26-0\" class=\"r0 c26\"></td><td width=\"50\" align=\"center\" id=\"27-0\" class=\"r0 c27\"></td><td width=\"50\" align=\"center\" id=\"28-0\" class=\"r0 c28\"></td><td width=\"50\" align=\"center\" id=\"29-0\" class=\"r0 c29\"></td><td width=\"50\" align=\"center\" id=\"30-0\" class=\"r0 c30\"></td><td width=\"50\" align=\"center\" id=\"31-0\" class=\"r0 c31\"></td><td width=\"50\" align=\"center\" id=\"32-0\" class=\"r0 c32\"></td><td width=\"50\" align=\"center\" id=\"33-0\" class=\"r0 c33\"></td><td width=\"50\" align=\"center\" id=\"34-0\" class=\"r0 c34\"></td><td width=\"50\" align=\"center\" id=\"35-0\" class=\"r0 c35\"></td><td width=\"50\" align=\"center\" id=\"36-0\" class=\"r0 c36\"></td><td width=\"50\" align=\"center\" id=\"37-0\" class=\"r0 c37\"></td><td width=\"50\" align=\"center\" id=\"38-0\" class=\"r0 c38\"></td><td width=\"50\" align=\"center\" id=\"39-0\" class=\"r0 c39\"></td><td width=\"50\" align=\"center\" id=\"40-0\" class=\"r0 c40\"></td></tr><tr id=\"row-1\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">2</td><td width=\"50\" align=\"center\" id=\"0-1\" class=\"dataready readonly r1 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-1\" class=\"dataready readonly r1 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-1\" class=\"dataready readonly r1 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-1\" class=\"dataready readonly r1 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-1\" class=\"dataready readonly r1 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-1\" class=\"dataready readonly r1 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-1\" class=\"dataready readonly r1 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-1\" class=\"dataready readonly r1 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-1\" class=\"dataready r1 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-1\" class=\"dataready readonly r1 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-1\" class=\"dataready r1 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-1\" class=\"r1 c11\"></td><td width=\"50\" align=\"center\" id=\"12-1\" class=\"r1 c12\"></td><td width=\"50\" align=\"center\" id=\"13-1\" class=\"r1 c13\"></td><td width=\"50\" align=\"center\" id=\"14-1\" class=\"r1 c14\"></td><td width=\"50\" align=\"center\" id=\"15-1\" class=\"r1 c15\"></td><td width=\"50\" align=\"center\" id=\"16-1\" class=\"r1 c16\"></td><td width=\"50\" align=\"center\" id=\"17-1\" class=\"r1 c17\"></td><td width=\"50\" align=\"center\" id=\"18-1\" class=\"r1 c18\"></td><td width=\"50\" align=\"center\" id=\"19-1\" class=\"r1 c19\"></td><td width=\"50\" align=\"center\" id=\"20-1\" class=\"r1 c20\"></td><td width=\"50\" align=\"center\" id=\"21-1\" class=\"r1 c21\"></td><td width=\"50\" align=\"center\" id=\"22-1\" class=\"r1 c22\"></td><td width=\"50\" align=\"center\" id=\"23-1\" class=\"r1 c23\"></td><td width=\"50\" align=\"center\" id=\"24-1\" class=\"r1 c24\"></td><td width=\"50\" align=\"center\" id=\"25-1\" class=\"r1 c25\"></td><td width=\"50\" align=\"center\" id=\"26-1\" class=\"r1 c26\"></td><td width=\"50\" align=\"center\" id=\"27-1\" class=\"r1 c27\"></td><td width=\"50\" align=\"center\" id=\"28-1\" class=\"r1 c28\"></td><td width=\"50\" align=\"center\" id=\"29-1\" class=\"r1 c29\"></td><td width=\"50\" align=\"center\" id=\"30-1\" class=\"r1 c30\"></td><td width=\"50\" align=\"center\" id=\"31-1\" class=\"r1 c31\"></td><td width=\"50\" align=\"center\" id=\"32-1\" class=\"r1 c32\"></td><td width=\"50\" align=\"center\" id=\"33-1\" class=\"r1 c33\"></td><td width=\"50\" align=\"center\" id=\"34-1\" class=\"r1 c34\"></td><td width=\"50\" align=\"center\" id=\"35-1\" class=\"r1 c35\"></td><td width=\"50\" align=\"center\" id=\"36-1\" class=\"r1 c36\"></td><td width=\"50\" align=\"center\" id=\"37-1\" class=\"r1 c37\"></td><td width=\"50\" align=\"center\" id=\"38-1\" class=\"r1 c38\"></td><td width=\"50\" align=\"center\" id=\"39-1\" class=\"r1 c39\"></td><td width=\"50\" align=\"center\" id=\"40-1\" class=\"r1 c40\"></td></tr><tr id=\"row-2\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">3</td><td width=\"50\" align=\"center\" id=\"0-2\" class=\"dataready readonly r2 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-2\" class=\"dataready readonly r2 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-2\" class=\"dataready readonly r2 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-2\" class=\"dataready readonly r2 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-2\" class=\"dataready readonly r2 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-2\" class=\"dataready readonly r2 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-2\" class=\"dataready readonly r2 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-2\" class=\"dataready readonly r2 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-2\" class=\"dataready r2 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-2\" class=\"dataready readonly r2 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-2\" class=\"dataready r2 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-2\" class=\"r2 c11\"></td><td width=\"50\" align=\"center\" id=\"12-2\" class=\"r2 c12\"></td><td width=\"50\" align=\"center\" id=\"13-2\" class=\"r2 c13\"></td><td width=\"50\" align=\"center\" id=\"14-2\" class=\"r2 c14\"></td><td width=\"50\" align=\"center\" id=\"15-2\" class=\"r2 c15\"></td><td width=\"50\" align=\"center\" id=\"16-2\" class=\"r2 c16\"></td><td width=\"50\" align=\"center\" id=\"17-2\" class=\"r2 c17\"></td><td width=\"50\" align=\"center\" id=\"18-2\" class=\"r2 c18\"></td><td width=\"50\" align=\"center\" id=\"19-2\" class=\"r2 c19\"></td><td width=\"50\" align=\"center\" id=\"20-2\" class=\"r2 c20\"></td><td width=\"50\" align=\"center\" id=\"21-2\" class=\"r2 c21\"></td><td width=\"50\" align=\"center\" id=\"22-2\" class=\"r2 c22\"></td><td width=\"50\" align=\"center\" id=\"23-2\" class=\"r2 c23\"></td><td width=\"50\" align=\"center\" id=\"24-2\" class=\"r2 c24\"></td><td width=\"50\" align=\"center\" id=\"25-2\" class=\"r2 c25\"></td><td width=\"50\" align=\"center\" id=\"26-2\" class=\"r2 c26\"></td><td width=\"50\" align=\"center\" id=\"27-2\" class=\"r2 c27\"></td><td width=\"50\" align=\"center\" id=\"28-2\" class=\"r2 c28\"></td><td width=\"50\" align=\"center\" id=\"29-2\" class=\"r2 c29\"></td><td width=\"50\" align=\"center\" id=\"30-2\" class=\"r2 c30\"></td><td width=\"50\" align=\"center\" id=\"31-2\" class=\"r2 c31\"></td><td width=\"50\" align=\"center\" id=\"32-2\" class=\"r2 c32\"></td><td width=\"50\" align=\"center\" id=\"33-2\" class=\"r2 c33\"></td><td width=\"50\" align=\"center\" id=\"34-2\" class=\"r2 c34\"></td><td width=\"50\" align=\"center\" id=\"35-2\" class=\"r2 c35\"></td><td width=\"50\" align=\"center\" id=\"36-2\" class=\"r2 c36\"></td><td width=\"50\" align=\"center\" id=\"37-2\" class=\"r2 c37\"></td><td width=\"50\" align=\"center\" id=\"38-2\" class=\"r2 c38\"></td><td width=\"50\" align=\"center\" id=\"39-2\" class=\"r2 c39\"></td><td width=\"50\" align=\"center\" id=\"40-2\" class=\"r2 c40\"></td></tr><tr id=\"row-3\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">4</td><td width=\"50\" align=\"center\" id=\"0-3\" class=\"dataready readonly r3 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-3\" class=\"dataready readonly r3 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-3\" class=\"dataready readonly r3 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-3\" class=\"dataready readonly r3 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-3\" class=\"dataready readonly r3 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-3\" class=\"dataready readonly r3 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-3\" class=\"dataready readonly r3 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-3\" class=\"dataready readonly r3 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-3\" class=\"dataready r3 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-3\" class=\"dataready readonly r3 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-3\" class=\"dataready r3 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-3\" class=\"r3 c11\"></td><td width=\"50\" align=\"center\" id=\"12-3\" class=\"r3 c12\"></td><td width=\"50\" align=\"center\" id=\"13-3\" class=\"r3 c13\"></td><td width=\"50\" align=\"center\" id=\"14-3\" class=\"r3 c14\"></td><td width=\"50\" align=\"center\" id=\"15-3\" class=\"r3 c15\"></td><td width=\"50\" align=\"center\" id=\"16-3\" class=\"r3 c16\"></td><td width=\"50\" align=\"center\" id=\"17-3\" class=\"r3 c17\"></td><td width=\"50\" align=\"center\" id=\"18-3\" class=\"r3 c18\"></td><td width=\"50\" align=\"center\" id=\"19-3\" class=\"r3 c19\"></td><td width=\"50\" align=\"center\" id=\"20-3\" class=\"r3 c20\"></td><td width=\"50\" align=\"center\" id=\"21-3\" class=\"r3 c21\"></td><td width=\"50\" align=\"center\" id=\"22-3\" class=\"r3 c22\"></td><td width=\"50\" align=\"center\" id=\"23-3\" class=\"r3 c23\"></td><td width=\"50\" align=\"center\" id=\"24-3\" class=\"r3 c24\"></td><td width=\"50\" align=\"center\" id=\"25-3\" class=\"r3 c25\"></td><td width=\"50\" align=\"center\" id=\"26-3\" class=\"r3 c26\"></td><td width=\"50\" align=\"center\" id=\"27-3\" class=\"r3 c27\"></td><td width=\"50\" align=\"center\" id=\"28-3\" class=\"r3 c28\"></td><td width=\"50\" align=\"center\" id=\"29-3\" class=\"r3 c29\"></td><td width=\"50\" align=\"center\" id=\"30-3\" class=\"r3 c30\"></td><td width=\"50\" align=\"center\" id=\"31-3\" class=\"r3 c31\"></td><td width=\"50\" align=\"center\" id=\"32-3\" class=\"r3 c32\"></td><td width=\"50\" align=\"center\" id=\"33-3\" class=\"r3 c33\"></td><td width=\"50\" align=\"center\" id=\"34-3\" class=\"r3 c34\"></td><td width=\"50\" align=\"center\" id=\"35-3\" class=\"r3 c35\"></td><td width=\"50\" align=\"center\" id=\"36-3\" class=\"r3 c36\"></td><td width=\"50\" align=\"center\" id=\"37-3\" class=\"r3 c37\"></td><td width=\"50\" align=\"center\" id=\"38-3\" class=\"r3 c38\"></td><td width=\"50\" align=\"center\" id=\"39-3\" class=\"r3 c39\"></td><td width=\"50\" align=\"center\" id=\"40-3\" class=\"r3 c40\"></td></tr><tr id=\"row-4\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">5</td><td width=\"50\" align=\"center\" id=\"0-4\" class=\"dataready readonly r4 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-4\" class=\"dataready readonly r4 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-4\" class=\"dataready readonly r4 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-4\" class=\"dataready readonly r4 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-4\" class=\"dataready readonly r4 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-4\" class=\"dataready readonly r4 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-4\" class=\"dataready readonly r4 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-4\" class=\"dataready readonly r4 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-4\" class=\"dataready r4 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-4\" class=\"dataready readonly r4 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-4\" class=\"dataready r4 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-4\" class=\"r4 c11\"></td><td width=\"50\" align=\"center\" id=\"12-4\" class=\"r4 c12\"></td><td width=\"50\" align=\"center\" id=\"13-4\" class=\"r4 c13\"></td><td width=\"50\" align=\"center\" id=\"14-4\" class=\"r4 c14\"></td><td width=\"50\" align=\"center\" id=\"15-4\" class=\"r4 c15\"></td><td width=\"50\" align=\"center\" id=\"16-4\" class=\"r4 c16\"></td><td width=\"50\" align=\"center\" id=\"17-4\" class=\"r4 c17\"></td><td width=\"50\" align=\"center\" id=\"18-4\" class=\"r4 c18\"></td><td width=\"50\" align=\"center\" id=\"19-4\" class=\"r4 c19\"></td><td width=\"50\" align=\"center\" id=\"20-4\" class=\"r4 c20\"></td><td width=\"50\" align=\"center\" id=\"21-4\" class=\"r4 c21\"></td><td width=\"50\" align=\"center\" id=\"22-4\" class=\"r4 c22\"></td><td width=\"50\" align=\"center\" id=\"23-4\" class=\"r4 c23\"></td><td width=\"50\" align=\"center\" id=\"24-4\" class=\"r4 c24\"></td><td width=\"50\" align=\"center\" id=\"25-4\" class=\"r4 c25\"></td><td width=\"50\" align=\"center\" id=\"26-4\" class=\"r4 c26\"></td><td width=\"50\" align=\"center\" id=\"27-4\" class=\"r4 c27\"></td><td width=\"50\" align=\"center\" id=\"28-4\" class=\"r4 c28\"></td><td width=\"50\" align=\"center\" id=\"29-4\" class=\"r4 c29\"></td><td width=\"50\" align=\"center\" id=\"30-4\" class=\"r4 c30\"></td><td width=\"50\" align=\"center\" id=\"31-4\" class=\"r4 c31\"></td><td width=\"50\" align=\"center\" id=\"32-4\" class=\"r4 c32\"></td><td width=\"50\" align=\"center\" id=\"33-4\" class=\"r4 c33\"></td><td width=\"50\" align=\"center\" id=\"34-4\" class=\"r4 c34\"></td><td width=\"50\" align=\"center\" id=\"35-4\" class=\"r4 c35\"></td><td width=\"50\" align=\"center\" id=\"36-4\" class=\"r4 c36\"></td><td width=\"50\" align=\"center\" id=\"37-4\" class=\"r4 c37\"></td><td width=\"50\" align=\"center\" id=\"38-4\" class=\"r4 c38\"></td><td width=\"50\" align=\"center\" id=\"39-4\" class=\"r4 c39\"></td><td width=\"50\" align=\"center\" id=\"40-4\" class=\"r4 c40\"></td></tr><tr id=\"row-5\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">6</td><td width=\"50\" align=\"center\" id=\"0-5\" class=\"dataready readonly r5 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-5\" class=\"dataready readonly r5 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-5\" class=\"dataready readonly r5 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-5\" class=\"dataready readonly r5 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-5\" class=\"dataready readonly r5 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-5\" class=\"dataready readonly r5 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-5\" class=\"dataready readonly r5 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-5\" class=\"dataready readonly r5 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-5\" class=\"dataready r5 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-5\" class=\"dataready readonly r5 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-5\" class=\"dataready r5 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(217, 226, 250); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-5\" class=\"r5 c11\"></td><td width=\"50\" align=\"center\" id=\"12-5\" class=\"r5 c12\"></td><td width=\"50\" align=\"center\" id=\"13-5\" class=\"r5 c13\"></td><td width=\"50\" align=\"center\" id=\"14-5\" class=\"r5 c14\"></td><td width=\"50\" align=\"center\" id=\"15-5\" class=\"r5 c15\"></td><td width=\"50\" align=\"center\" id=\"16-5\" class=\"r5 c16\"></td><td width=\"50\" align=\"center\" id=\"17-5\" class=\"r5 c17\"></td><td width=\"50\" align=\"center\" id=\"18-5\" class=\"r5 c18\"></td><td width=\"50\" align=\"center\" id=\"19-5\" class=\"r5 c19\"></td><td width=\"50\" align=\"center\" id=\"20-5\" class=\"r5 c20\"></td><td width=\"50\" align=\"center\" id=\"21-5\" class=\"r5 c21\"></td><td width=\"50\" align=\"center\" id=\"22-5\" class=\"r5 c22\"></td><td width=\"50\" align=\"center\" id=\"23-5\" class=\"r5 c23\"></td><td width=\"50\" align=\"center\" id=\"24-5\" class=\"r5 c24\"></td><td width=\"50\" align=\"center\" id=\"25-5\" class=\"r5 c25\"></td><td width=\"50\" align=\"center\" id=\"26-5\" class=\"r5 c26\"></td><td width=\"50\" align=\"center\" id=\"27-5\" class=\"r5 c27\"></td><td width=\"50\" align=\"center\" id=\"28-5\" class=\"r5 c28\"></td><td width=\"50\" align=\"center\" id=\"29-5\" class=\"r5 c29\"></td><td width=\"50\" align=\"center\" id=\"30-5\" class=\"r5 c30\"></td><td width=\"50\" align=\"center\" id=\"31-5\" class=\"r5 c31\"></td><td width=\"50\" align=\"center\" id=\"32-5\" class=\"r5 c32\"></td><td width=\"50\" align=\"center\" id=\"33-5\" class=\"r5 c33\"></td><td width=\"50\" align=\"center\" id=\"34-5\" class=\"r5 c34\"></td><td width=\"50\" align=\"center\" id=\"35-5\" class=\"r5 c35\"></td><td width=\"50\" align=\"center\" id=\"36-5\" class=\"r5 c36\"></td><td width=\"50\" align=\"center\" id=\"37-5\" class=\"r5 c37\"></td><td width=\"50\" align=\"center\" id=\"38-5\" class=\"r5 c38\"></td><td width=\"50\" align=\"center\" id=\"39-5\" class=\"r5 c39\"></td><td width=\"50\" align=\"center\" id=\"40-5\" class=\"r5 c40\"></td></tr><tr id=\"row-6\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">7</td><td width=\"50\" align=\"center\" id=\"0-6\" class=\"dataready readonly r6 c0\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); border-left: 1px solid rgb(82, 218, 245);\"></td><td width=\"50\" align=\"center\" id=\"1-6\" class=\"dataready readonly r6 c1\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"2-6\" class=\"dataready readonly r6 c2\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"3-6\" class=\"dataready readonly r6 c3\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"4-6\" class=\"dataready readonly r6 c4\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"5-6\" class=\"dataready readonly r6 c5\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"6-6\" class=\"dataready readonly r6 c6\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"7-6\" class=\"dataready readonly r6 c7\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"></td><td width=\"50\" align=\"center\" id=\"8-6\" class=\"dataready r6 c8 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-6\" class=\"dataready readonly r6 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-6\" class=\"dataready r6 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-6\" class=\"r6 c11\"></td><td width=\"50\" align=\"center\" id=\"12-6\" class=\"r6 c12\"></td><td width=\"50\" align=\"center\" id=\"13-6\" class=\"r6 c13\"></td><td width=\"50\" align=\"center\" id=\"14-6\" class=\"r6 c14\"></td><td width=\"50\" align=\"center\" id=\"15-6\" class=\"r6 c15\"></td><td width=\"50\" align=\"center\" id=\"16-6\" class=\"r6 c16\"></td><td width=\"50\" align=\"center\" id=\"17-6\" class=\"r6 c17\"></td><td width=\"50\" align=\"center\" id=\"18-6\" class=\"r6 c18\"></td><td width=\"50\" align=\"center\" id=\"19-6\" class=\"r6 c19\"></td><td width=\"50\" align=\"center\" id=\"20-6\" class=\"r6 c20\"></td><td width=\"50\" align=\"center\" id=\"21-6\" class=\"r6 c21\"></td><td width=\"50\" align=\"center\" id=\"22-6\" class=\"r6 c22\"></td><td width=\"50\" align=\"center\" id=\"23-6\" class=\"r6 c23\"></td><td width=\"50\" align=\"center\" id=\"24-6\" class=\"r6 c24\"></td><td width=\"50\" align=\"center\" id=\"25-6\" class=\"r6 c25\"></td><td width=\"50\" align=\"center\" id=\"26-6\" class=\"r6 c26\"></td><td width=\"50\" align=\"center\" id=\"27-6\" class=\"r6 c27\"></td><td width=\"50\" align=\"center\" id=\"28-6\" class=\"r6 c28\"></td><td width=\"50\" align=\"center\" id=\"29-6\" class=\"r6 c29\"></td><td width=\"50\" align=\"center\" id=\"30-6\" class=\"r6 c30\"></td><td width=\"50\" align=\"center\" id=\"31-6\" class=\"r6 c31\"></td><td width=\"50\" align=\"center\" id=\"32-6\" class=\"r6 c32\"></td><td width=\"50\" align=\"center\" id=\"33-6\" class=\"r6 c33\"></td><td width=\"50\" align=\"center\" id=\"34-6\" class=\"r6 c34\"></td><td width=\"50\" align=\"center\" id=\"35-6\" class=\"r6 c35\"></td><td width=\"50\" align=\"center\" id=\"36-6\" class=\"r6 c36\"></td><td width=\"50\" align=\"center\" id=\"37-6\" class=\"r6 c37\"></td><td width=\"50\" align=\"center\" id=\"38-6\" class=\"r6 c38\"></td><td width=\"50\" align=\"center\" id=\"39-6\" class=\"r6 c39\"></td><td width=\"50\" align=\"center\" id=\"40-6\" class=\"r6 c40\"></td></tr><tr id=\"row-7\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">8</td><td width=\"50\" align=\"center\" id=\"0-7\" class=\"datareadyfoot r7 c0\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6); border-left: 1px solid rgb(82, 218, 245);\" type=\"sum\" colspan=\"1\" rowspan=\"1\">合计</td><td width=\"50\" align=\"center\" id=\"1-7\" class=\"datareadyfoot readonly r7 c1\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"2-7\" class=\"datareadyfoot readonly r7 c2\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"3-7\" class=\"datareadyfoot readonly r7 c3\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"4-7\" class=\"datareadyfoot readonly r7 c4\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"5-7\" class=\"datareadyfoot readonly r7 c5\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"6-7\" class=\"datareadyfoot readonly r7 c6\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"7-7\" class=\"datareadyfoot readonly r7 c7\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"sum\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"8-7\" class=\"datareadyfoot readonly r7 c8\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-7\" class=\"datareadyfoot readonly r7 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-7\" class=\"datareadyfoot r7 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-7\" class=\"r7 c11\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"12-7\" class=\"r7 c12\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"13-7\" class=\"r7 c13\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"14-7\" class=\"r7 c14\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"15-7\" class=\"r7 c15\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"16-7\" class=\"r7 c16\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"17-7\" class=\"r7 c17\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"18-7\" class=\"r7 c18\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"19-7\" class=\"r7 c19\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"20-7\" class=\"r7 c20\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"21-7\" class=\"r7 c21\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"22-7\" class=\"r7 c22\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"23-7\" class=\"r7 c23\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"24-7\" class=\"r7 c24\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"25-7\" class=\"r7 c25\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"26-7\" class=\"r7 c26\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"27-7\" class=\"r7 c27\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"28-7\" class=\"r7 c28\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"29-7\" class=\"r7 c29\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"30-7\" class=\"r7 c30\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"31-7\" class=\"r7 c31\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"32-7\" class=\"r7 c32\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"33-7\" class=\"r7 c33\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"34-7\" class=\"r7 c34\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"35-7\" class=\"r7 c35\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"36-7\" class=\"r7 c36\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"37-7\" class=\"r7 c37\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"38-7\" class=\"r7 c38\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"39-7\" class=\"r7 c39\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"40-7\" class=\"r7 c40\" b=\"\" wai=\"\" style=\"\"></td></tr><tr id=\"row-8\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">9</td><td width=\"50\" align=\"center\" id=\"0-8\" class=\"datareadyfoot r8 c0\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6); border-left: 1px solid rgb(82, 218, 245);\" type=\"mean\" colspan=\"1\" rowspan=\"1\">平均</td><td width=\"50\" align=\"center\" id=\"1-8\" class=\"datareadyfoot readonly r8 c1\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"2-8\" class=\"datareadyfoot readonly r8 c2\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"3-8\" class=\"datareadyfoot readonly r8 c3\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"4-8\" class=\"datareadyfoot readonly r8 c4\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"5-8\" class=\"datareadyfoot readonly r8 c5\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"6-8\" class=\"datareadyfoot readonly r8 c6\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"7-8\" class=\"datareadyfoot readonly r8 c7\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"mean\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"8-8\" class=\"datareadyfoot readonly r8 c8\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-8\" class=\"datareadyfoot readonly r8 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-8\" class=\"datareadyfoot r8 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-8\" class=\"r8 c11\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"12-8\" class=\"r8 c12\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"13-8\" class=\"r8 c13\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"14-8\" class=\"r8 c14\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"15-8\" class=\"r8 c15\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"16-8\" class=\"r8 c16\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"17-8\" class=\"r8 c17\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"18-8\" class=\"r8 c18\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"19-8\" class=\"r8 c19\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"20-8\" class=\"r8 c20\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"21-8\" class=\"r8 c21\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"22-8\" class=\"r8 c22\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"23-8\" class=\"r8 c23\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"24-8\" class=\"r8 c24\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"25-8\" class=\"r8 c25\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"26-8\" class=\"r8 c26\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"27-8\" class=\"r8 c27\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"28-8\" class=\"r8 c28\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"29-8\" class=\"r8 c29\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"30-8\" class=\"r8 c30\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"31-8\" class=\"r8 c31\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"32-8\" class=\"r8 c32\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"33-8\" class=\"r8 c33\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"34-8\" class=\"r8 c34\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"35-8\" class=\"r8 c35\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"36-8\" class=\"r8 c36\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"37-8\" class=\"r8 c37\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"38-8\" class=\"r8 c38\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"39-8\" class=\"r8 c39\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"40-8\" class=\"r8 c40\" b=\"\" wai=\"\" style=\"\"></td></tr><tr id=\"row-9\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">10</td><td width=\"50\" align=\"center\" id=\"0-9\" class=\"datareadyfoot r9 c0\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6); border-left: 1px solid rgb(82, 218, 245);\" type=\"min\" colspan=\"1\" rowspan=\"1\">最小</td><td width=\"50\" align=\"center\" id=\"1-9\" class=\"datareadyfoot readonly r9 c1\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"2-9\" class=\"datareadyfoot readonly r9 c2\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"3-9\" class=\"datareadyfoot readonly r9 c3\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"4-9\" class=\"datareadyfoot readonly r9 c4\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"5-9\" class=\"datareadyfoot readonly r9 c5\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"6-9\" class=\"datareadyfoot readonly r9 c6\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"7-9\" class=\"datareadyfoot readonly r9 c7\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"min\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"8-9\" class=\"datareadyfoot readonly r9 c8\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-9\" class=\"datareadyfoot readonly r9 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-9\" class=\"datareadyfoot r9 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-9\" class=\"r9 c11\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"12-9\" class=\"r9 c12\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"13-9\" class=\"r9 c13\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"14-9\" class=\"r9 c14\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"15-9\" class=\"r9 c15\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"16-9\" class=\"r9 c16\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"17-9\" class=\"r9 c17\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"18-9\" class=\"r9 c18\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"19-9\" class=\"r9 c19\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"20-9\" class=\"r9 c20\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"21-9\" class=\"r9 c21\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"22-9\" class=\"r9 c22\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"23-9\" class=\"r9 c23\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"24-9\" class=\"r9 c24\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"25-9\" class=\"r9 c25\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"26-9\" class=\"r9 c26\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"27-9\" class=\"r9 c27\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"28-9\" class=\"r9 c28\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"29-9\" class=\"r9 c29\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"30-9\" class=\"r9 c30\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"31-9\" class=\"r9 c31\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"32-9\" class=\"r9 c32\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"33-9\" class=\"r9 c33\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"34-9\" class=\"r9 c34\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"35-9\" class=\"r9 c35\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"36-9\" class=\"r9 c36\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"37-9\" class=\"r9 c37\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"38-9\" class=\"r9 c38\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"39-9\" class=\"r9 c39\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"40-9\" class=\"r9 c40\" b=\"\" wai=\"\" style=\"\"></td></tr><tr id=\"row-10\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">11</td><td width=\"50\" align=\"center\" id=\"0-10\" class=\"datareadyfoot r10 c0\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6); border-left: 1px solid rgb(82, 218, 245);\" type=\"max\" colspan=\"1\" rowspan=\"1\">最大</td><td width=\"50\" align=\"center\" id=\"1-10\" class=\"datareadyfoot r10 c1 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"2-10\" class=\"datareadyfoot r10 c2 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"3-10\" class=\"datareadyfoot r10 c3 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"4-10\" class=\"datareadyfoot r10 c4 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"5-10\" class=\"datareadyfoot r10 c5 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"6-10\" class=\"datareadyfoot r10 c6 readonly\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"7-10\" class=\"datareadyfoot readonly r10 c7\" b=\"\" wai=\"\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" type=\"max\" colspan=\"1\" rowspan=\"1\"></td><td width=\"50\" align=\"center\" id=\"8-10\" class=\"datareadyfoot readonly r10 c8\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-10\" class=\"datareadyfoot readonly r10 c9\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-10\" class=\"datareadyfoot r10 c10 readonly\" style=\"border-right: 1px solid rgb(82, 218, 245); border-bottom: 1px solid rgb(82, 218, 245); background-color: rgb(230, 251, 226); color: rgb(17, 115, 6);\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-10\" class=\"r10 c11\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"12-10\" class=\"r10 c12\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"13-10\" class=\"r10 c13\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"14-10\" class=\"r10 c14\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"15-10\" class=\"r10 c15\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"16-10\" class=\"r10 c16\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"17-10\" class=\"r10 c17\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"18-10\" class=\"r10 c18\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"19-10\" class=\"r10 c19\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"20-10\" class=\"r10 c20\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"21-10\" class=\"r10 c21\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"22-10\" class=\"r10 c22\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"23-10\" class=\"r10 c23\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"24-10\" class=\"r10 c24\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"25-10\" class=\"r10 c25\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"26-10\" class=\"r10 c26\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"27-10\" class=\"r10 c27\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"28-10\" class=\"r10 c28\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"29-10\" class=\"r10 c29\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"30-10\" class=\"r10 c30\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"31-10\" class=\"r10 c31\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"32-10\" class=\"r10 c32\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"33-10\" class=\"r10 c33\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"34-10\" class=\"r10 c34\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"35-10\" class=\"r10 c35\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"36-10\" class=\"r10 c36\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"37-10\" class=\"r10 c37\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"38-10\" class=\"r10 c38\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"39-10\" class=\"r10 c39\" b=\"\" wai=\"\" style=\"\"></td><td width=\"50\" align=\"center\" id=\"40-10\" class=\"r10 c40\" b=\"\" wai=\"\" style=\"\"></td></tr><tr id=\"row-11\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">12</td><td width=\"50\" align=\"center\" id=\"0-11\" class=\"r11 c0\"></td><td width=\"50\" align=\"center\" id=\"1-11\" class=\"r11 c1\"></td><td width=\"50\" align=\"center\" id=\"2-11\" class=\"r11 c2\"></td><td width=\"50\" align=\"center\" id=\"3-11\" class=\"r11 c3\"></td><td width=\"50\" align=\"center\" id=\"4-11\" class=\"r11 c4\"></td><td width=\"50\" align=\"center\" id=\"5-11\" class=\"r11 c5\"></td><td width=\"50\" align=\"center\" id=\"6-11\" class=\"r11 c6\"></td><td width=\"50\" align=\"center\" id=\"7-11\" class=\"r11 c7\"></td><td width=\"50\" align=\"center\" id=\"8-11\" class=\"r11 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-11\" class=\"r11 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-11\" class=\"r11 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-11\" class=\"r11 c11\"></td><td width=\"50\" align=\"center\" id=\"12-11\" class=\"r11 c12\"></td><td width=\"50\" align=\"center\" id=\"13-11\" class=\"r11 c13\"></td><td width=\"50\" align=\"center\" id=\"14-11\" class=\"r11 c14\"></td><td width=\"50\" align=\"center\" id=\"15-11\" class=\"r11 c15\"></td><td width=\"50\" align=\"center\" id=\"16-11\" class=\"r11 c16\"></td><td width=\"50\" align=\"center\" id=\"17-11\" class=\"r11 c17\"></td><td width=\"50\" align=\"center\" id=\"18-11\" class=\"r11 c18\"></td><td width=\"50\" align=\"center\" id=\"19-11\" class=\"r11 c19\"></td><td width=\"50\" align=\"center\" id=\"20-11\" class=\"r11 c20\"></td><td width=\"50\" align=\"center\" id=\"21-11\" class=\"r11 c21\"></td><td width=\"50\" align=\"center\" id=\"22-11\" class=\"r11 c22\"></td><td width=\"50\" align=\"center\" id=\"23-11\" class=\"r11 c23\"></td><td width=\"50\" align=\"center\" id=\"24-11\" class=\"r11 c24\"></td><td width=\"50\" align=\"center\" id=\"25-11\" class=\"r11 c25\"></td><td width=\"50\" align=\"center\" id=\"26-11\" class=\"r11 c26\"></td><td width=\"50\" align=\"center\" id=\"27-11\" class=\"r11 c27\"></td><td width=\"50\" align=\"center\" id=\"28-11\" class=\"r11 c28\"></td><td width=\"50\" align=\"center\" id=\"29-11\" class=\"r11 c29\"></td><td width=\"50\" align=\"center\" id=\"30-11\" class=\"r11 c30\"></td><td width=\"50\" align=\"center\" id=\"31-11\" class=\"r11 c31\"></td><td width=\"50\" align=\"center\" id=\"32-11\" class=\"r11 c32\"></td><td width=\"50\" align=\"center\" id=\"33-11\" class=\"r11 c33\"></td><td width=\"50\" align=\"center\" id=\"34-11\" class=\"r11 c34\"></td><td width=\"50\" align=\"center\" id=\"35-11\" class=\"r11 c35\"></td><td width=\"50\" align=\"center\" id=\"36-11\" class=\"r11 c36\"></td><td width=\"50\" align=\"center\" id=\"37-11\" class=\"r11 c37\"></td><td width=\"50\" align=\"center\" id=\"38-11\" class=\"r11 c38\"></td><td width=\"50\" align=\"center\" id=\"39-11\" class=\"r11 c39\"></td><td width=\"50\" align=\"center\" id=\"40-11\" class=\"r11 c40\"></td></tr><tr id=\"row-12\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">13</td><td width=\"50\" align=\"center\" id=\"0-12\" class=\"r12 c0\"></td><td width=\"50\" align=\"center\" id=\"1-12\" class=\"r12 c1\"></td><td width=\"50\" align=\"center\" id=\"2-12\" class=\"r12 c2\"></td><td width=\"50\" align=\"center\" id=\"3-12\" class=\"r12 c3\"></td><td width=\"50\" align=\"center\" id=\"4-12\" class=\"r12 c4\"></td><td width=\"50\" align=\"center\" id=\"5-12\" class=\"r12 c5\"></td><td width=\"50\" align=\"center\" id=\"6-12\" class=\"r12 c6\"></td><td width=\"50\" align=\"center\" id=\"7-12\" class=\"r12 c7\"></td><td width=\"50\" align=\"center\" id=\"8-12\" class=\"r12 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-12\" class=\"r12 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-12\" class=\"r12 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-12\" class=\"r12 c11\"></td><td width=\"50\" align=\"center\" id=\"12-12\" class=\"r12 c12\"></td><td width=\"50\" align=\"center\" id=\"13-12\" class=\"r12 c13\"></td><td width=\"50\" align=\"center\" id=\"14-12\" class=\"r12 c14\"></td><td width=\"50\" align=\"center\" id=\"15-12\" class=\"r12 c15\"></td><td width=\"50\" align=\"center\" id=\"16-12\" class=\"r12 c16\"></td><td width=\"50\" align=\"center\" id=\"17-12\" class=\"r12 c17\"></td><td width=\"50\" align=\"center\" id=\"18-12\" class=\"r12 c18\"></td><td width=\"50\" align=\"center\" id=\"19-12\" class=\"r12 c19\"></td><td width=\"50\" align=\"center\" id=\"20-12\" class=\"r12 c20\"></td><td width=\"50\" align=\"center\" id=\"21-12\" class=\"r12 c21\"></td><td width=\"50\" align=\"center\" id=\"22-12\" class=\"r12 c22\"></td><td width=\"50\" align=\"center\" id=\"23-12\" class=\"r12 c23\"></td><td width=\"50\" align=\"center\" id=\"24-12\" class=\"r12 c24\"></td><td width=\"50\" align=\"center\" id=\"25-12\" class=\"r12 c25\"></td><td width=\"50\" align=\"center\" id=\"26-12\" class=\"r12 c26\"></td><td width=\"50\" align=\"center\" id=\"27-12\" class=\"r12 c27\"></td><td width=\"50\" align=\"center\" id=\"28-12\" class=\"r12 c28\"></td><td width=\"50\" align=\"center\" id=\"29-12\" class=\"r12 c29\"></td><td width=\"50\" align=\"center\" id=\"30-12\" class=\"r12 c30\"></td><td width=\"50\" align=\"center\" id=\"31-12\" class=\"r12 c31\"></td><td width=\"50\" align=\"center\" id=\"32-12\" class=\"r12 c32\"></td><td width=\"50\" align=\"center\" id=\"33-12\" class=\"r12 c33\"></td><td width=\"50\" align=\"center\" id=\"34-12\" class=\"r12 c34\"></td><td width=\"50\" align=\"center\" id=\"35-12\" class=\"r12 c35\"></td><td width=\"50\" align=\"center\" id=\"36-12\" class=\"r12 c36\"></td><td width=\"50\" align=\"center\" id=\"37-12\" class=\"r12 c37\"></td><td width=\"50\" align=\"center\" id=\"38-12\" class=\"r12 c38\"></td><td width=\"50\" align=\"center\" id=\"39-12\" class=\"r12 c39\"></td><td width=\"50\" align=\"center\" id=\"40-12\" class=\"r12 c40\"></td></tr><tr id=\"row-13\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">14</td><td width=\"50\" align=\"center\" id=\"0-13\" class=\"r13 c0\"></td><td width=\"50\" align=\"center\" id=\"1-13\" class=\"r13 c1\"></td><td width=\"50\" align=\"center\" id=\"2-13\" class=\"r13 c2\"></td><td width=\"50\" align=\"center\" id=\"3-13\" class=\"r13 c3\"></td><td width=\"50\" align=\"center\" id=\"4-13\" class=\"r13 c4\"></td><td width=\"50\" align=\"center\" id=\"5-13\" class=\"r13 c5\"></td><td width=\"50\" align=\"center\" id=\"6-13\" class=\"r13 c6\"></td><td width=\"50\" align=\"center\" id=\"7-13\" class=\"r13 c7\"></td><td width=\"50\" align=\"center\" id=\"8-13\" class=\"r13 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-13\" class=\"r13 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-13\" class=\"r13 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-13\" class=\"r13 c11\"></td><td width=\"50\" align=\"center\" id=\"12-13\" class=\"r13 c12\"></td><td width=\"50\" align=\"center\" id=\"13-13\" class=\"r13 c13\"></td><td width=\"50\" align=\"center\" id=\"14-13\" class=\"r13 c14\"></td><td width=\"50\" align=\"center\" id=\"15-13\" class=\"r13 c15\"></td><td width=\"50\" align=\"center\" id=\"16-13\" class=\"r13 c16\"></td><td width=\"50\" align=\"center\" id=\"17-13\" class=\"r13 c17\"></td><td width=\"50\" align=\"center\" id=\"18-13\" class=\"r13 c18\"></td><td width=\"50\" align=\"center\" id=\"19-13\" class=\"r13 c19\"></td><td width=\"50\" align=\"center\" id=\"20-13\" class=\"r13 c20\"></td><td width=\"50\" align=\"center\" id=\"21-13\" class=\"r13 c21\"></td><td width=\"50\" align=\"center\" id=\"22-13\" class=\"r13 c22\"></td><td width=\"50\" align=\"center\" id=\"23-13\" class=\"r13 c23\"></td><td width=\"50\" align=\"center\" id=\"24-13\" class=\"r13 c24\"></td><td width=\"50\" align=\"center\" id=\"25-13\" class=\"r13 c25\"></td><td width=\"50\" align=\"center\" id=\"26-13\" class=\"r13 c26\"></td><td width=\"50\" align=\"center\" id=\"27-13\" class=\"r13 c27\"></td><td width=\"50\" align=\"center\" id=\"28-13\" class=\"r13 c28\"></td><td width=\"50\" align=\"center\" id=\"29-13\" class=\"r13 c29\"></td><td width=\"50\" align=\"center\" id=\"30-13\" class=\"r13 c30\"></td><td width=\"50\" align=\"center\" id=\"31-13\" class=\"r13 c31\"></td><td width=\"50\" align=\"center\" id=\"32-13\" class=\"r13 c32\"></td><td width=\"50\" align=\"center\" id=\"33-13\" class=\"r13 c33\"></td><td width=\"50\" align=\"center\" id=\"34-13\" class=\"r13 c34\"></td><td width=\"50\" align=\"center\" id=\"35-13\" class=\"r13 c35\"></td><td width=\"50\" align=\"center\" id=\"36-13\" class=\"r13 c36\"></td><td width=\"50\" align=\"center\" id=\"37-13\" class=\"r13 c37\"></td><td width=\"50\" align=\"center\" id=\"38-13\" class=\"r13 c38\"></td><td width=\"50\" align=\"center\" id=\"39-13\" class=\"r13 c39\"></td><td width=\"50\" align=\"center\" id=\"40-13\" class=\"r13 c40\"></td></tr><tr id=\"row-14\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">15</td><td width=\"50\" align=\"center\" id=\"0-14\" class=\"r14 c0\"></td><td width=\"50\" align=\"center\" id=\"1-14\" class=\"r14 c1\"></td><td width=\"50\" align=\"center\" id=\"2-14\" class=\"r14 c2\"></td><td width=\"50\" align=\"center\" id=\"3-14\" class=\"r14 c3\"></td><td width=\"50\" align=\"center\" id=\"4-14\" class=\"r14 c4\"></td><td width=\"50\" align=\"center\" id=\"5-14\" class=\"r14 c5\"></td><td width=\"50\" align=\"center\" id=\"6-14\" class=\"r14 c6\"></td><td width=\"50\" align=\"center\" id=\"7-14\" class=\"r14 c7\"></td><td width=\"50\" align=\"center\" id=\"8-14\" class=\"r14 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-14\" class=\"r14 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-14\" class=\"r14 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-14\" class=\"r14 c11\"></td><td width=\"50\" align=\"center\" id=\"12-14\" class=\"r14 c12\"></td><td width=\"50\" align=\"center\" id=\"13-14\" class=\"r14 c13\"></td><td width=\"50\" align=\"center\" id=\"14-14\" class=\"r14 c14\"></td><td width=\"50\" align=\"center\" id=\"15-14\" class=\"r14 c15\"></td><td width=\"50\" align=\"center\" id=\"16-14\" class=\"r14 c16\"></td><td width=\"50\" align=\"center\" id=\"17-14\" class=\"r14 c17\"></td><td width=\"50\" align=\"center\" id=\"18-14\" class=\"r14 c18\"></td><td width=\"50\" align=\"center\" id=\"19-14\" class=\"r14 c19\"></td><td width=\"50\" align=\"center\" id=\"20-14\" class=\"r14 c20\"></td><td width=\"50\" align=\"center\" id=\"21-14\" class=\"r14 c21\"></td><td width=\"50\" align=\"center\" id=\"22-14\" class=\"r14 c22\"></td><td width=\"50\" align=\"center\" id=\"23-14\" class=\"r14 c23\"></td><td width=\"50\" align=\"center\" id=\"24-14\" class=\"r14 c24\"></td><td width=\"50\" align=\"center\" id=\"25-14\" class=\"r14 c25\"></td><td width=\"50\" align=\"center\" id=\"26-14\" class=\"r14 c26\"></td><td width=\"50\" align=\"center\" id=\"27-14\" class=\"r14 c27\"></td><td width=\"50\" align=\"center\" id=\"28-14\" class=\"r14 c28\"></td><td width=\"50\" align=\"center\" id=\"29-14\" class=\"r14 c29\"></td><td width=\"50\" align=\"center\" id=\"30-14\" class=\"r14 c30\"></td><td width=\"50\" align=\"center\" id=\"31-14\" class=\"r14 c31\"></td><td width=\"50\" align=\"center\" id=\"32-14\" class=\"r14 c32\"></td><td width=\"50\" align=\"center\" id=\"33-14\" class=\"r14 c33\"></td><td width=\"50\" align=\"center\" id=\"34-14\" class=\"r14 c34\"></td><td width=\"50\" align=\"center\" id=\"35-14\" class=\"r14 c35\"></td><td width=\"50\" align=\"center\" id=\"36-14\" class=\"r14 c36\"></td><td width=\"50\" align=\"center\" id=\"37-14\" class=\"r14 c37\"></td><td width=\"50\" align=\"center\" id=\"38-14\" class=\"r14 c38\"></td><td width=\"50\" align=\"center\" id=\"39-14\" class=\"r14 c39\"></td><td width=\"50\" align=\"center\" id=\"40-14\" class=\"r14 c40\"></td></tr><tr id=\"row-15\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">16</td><td width=\"50\" align=\"center\" id=\"0-15\" class=\"r15 c0\"></td><td width=\"50\" align=\"center\" id=\"1-15\" class=\"r15 c1\"></td><td width=\"50\" align=\"center\" id=\"2-15\" class=\"r15 c2\"></td><td width=\"50\" align=\"center\" id=\"3-15\" class=\"r15 c3\"></td><td width=\"50\" align=\"center\" id=\"4-15\" class=\"r15 c4\"></td><td width=\"50\" align=\"center\" id=\"5-15\" class=\"r15 c5\"></td><td width=\"50\" align=\"center\" id=\"6-15\" class=\"r15 c6\"></td><td width=\"50\" align=\"center\" id=\"7-15\" class=\"r15 c7\"></td><td width=\"50\" align=\"center\" id=\"8-15\" class=\"r15 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-15\" class=\"r15 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-15\" class=\"r15 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-15\" class=\"r15 c11\"></td><td width=\"50\" align=\"center\" id=\"12-15\" class=\"r15 c12\"></td><td width=\"50\" align=\"center\" id=\"13-15\" class=\"r15 c13\"></td><td width=\"50\" align=\"center\" id=\"14-15\" class=\"r15 c14\"></td><td width=\"50\" align=\"center\" id=\"15-15\" class=\"r15 c15\"></td><td width=\"50\" align=\"center\" id=\"16-15\" class=\"r15 c16\"></td><td width=\"50\" align=\"center\" id=\"17-15\" class=\"r15 c17\"></td><td width=\"50\" align=\"center\" id=\"18-15\" class=\"r15 c18\"></td><td width=\"50\" align=\"center\" id=\"19-15\" class=\"r15 c19\"></td><td width=\"50\" align=\"center\" id=\"20-15\" class=\"r15 c20\"></td><td width=\"50\" align=\"center\" id=\"21-15\" class=\"r15 c21\"></td><td width=\"50\" align=\"center\" id=\"22-15\" class=\"r15 c22\"></td><td width=\"50\" align=\"center\" id=\"23-15\" class=\"r15 c23\"></td><td width=\"50\" align=\"center\" id=\"24-15\" class=\"r15 c24\"></td><td width=\"50\" align=\"center\" id=\"25-15\" class=\"r15 c25\"></td><td width=\"50\" align=\"center\" id=\"26-15\" class=\"r15 c26\"></td><td width=\"50\" align=\"center\" id=\"27-15\" class=\"r15 c27\"></td><td width=\"50\" align=\"center\" id=\"28-15\" class=\"r15 c28\"></td><td width=\"50\" align=\"center\" id=\"29-15\" class=\"r15 c29\"></td><td width=\"50\" align=\"center\" id=\"30-15\" class=\"r15 c30\"></td><td width=\"50\" align=\"center\" id=\"31-15\" class=\"r15 c31\"></td><td width=\"50\" align=\"center\" id=\"32-15\" class=\"r15 c32\"></td><td width=\"50\" align=\"center\" id=\"33-15\" class=\"r15 c33\"></td><td width=\"50\" align=\"center\" id=\"34-15\" class=\"r15 c34\"></td><td width=\"50\" align=\"center\" id=\"35-15\" class=\"r15 c35\"></td><td width=\"50\" align=\"center\" id=\"36-15\" class=\"r15 c36\"></td><td width=\"50\" align=\"center\" id=\"37-15\" class=\"r15 c37\"></td><td width=\"50\" align=\"center\" id=\"38-15\" class=\"r15 c38\"></td><td width=\"50\" align=\"center\" id=\"39-15\" class=\"r15 c39\"></td><td width=\"50\" align=\"center\" id=\"40-15\" class=\"r15 c40\"></td></tr><tr id=\"row-16\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">17</td><td width=\"50\" align=\"center\" id=\"0-16\" class=\"r16 c0\"></td><td width=\"50\" align=\"center\" id=\"1-16\" class=\"r16 c1\"></td><td width=\"50\" align=\"center\" id=\"2-16\" class=\"r16 c2\"></td><td width=\"50\" align=\"center\" id=\"3-16\" class=\"r16 c3\"></td><td width=\"50\" align=\"center\" id=\"4-16\" class=\"r16 c4\"></td><td width=\"50\" align=\"center\" id=\"5-16\" class=\"r16 c5\"></td><td width=\"50\" align=\"center\" id=\"6-16\" class=\"r16 c6\"></td><td width=\"50\" align=\"center\" id=\"7-16\" class=\"r16 c7\"></td><td width=\"50\" align=\"center\" id=\"8-16\" class=\"r16 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-16\" class=\"r16 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-16\" class=\"r16 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-16\" class=\"r16 c11\"></td><td width=\"50\" align=\"center\" id=\"12-16\" class=\"r16 c12\"></td><td width=\"50\" align=\"center\" id=\"13-16\" class=\"r16 c13\"></td><td width=\"50\" align=\"center\" id=\"14-16\" class=\"r16 c14\"></td><td width=\"50\" align=\"center\" id=\"15-16\" class=\"r16 c15\"></td><td width=\"50\" align=\"center\" id=\"16-16\" class=\"r16 c16\"></td><td width=\"50\" align=\"center\" id=\"17-16\" class=\"r16 c17\"></td><td width=\"50\" align=\"center\" id=\"18-16\" class=\"r16 c18\"></td><td width=\"50\" align=\"center\" id=\"19-16\" class=\"r16 c19\"></td><td width=\"50\" align=\"center\" id=\"20-16\" class=\"r16 c20\"></td><td width=\"50\" align=\"center\" id=\"21-16\" class=\"r16 c21\"></td><td width=\"50\" align=\"center\" id=\"22-16\" class=\"r16 c22\"></td><td width=\"50\" align=\"center\" id=\"23-16\" class=\"r16 c23\"></td><td width=\"50\" align=\"center\" id=\"24-16\" class=\"r16 c24\"></td><td width=\"50\" align=\"center\" id=\"25-16\" class=\"r16 c25\"></td><td width=\"50\" align=\"center\" id=\"26-16\" class=\"r16 c26\"></td><td width=\"50\" align=\"center\" id=\"27-16\" class=\"r16 c27\"></td><td width=\"50\" align=\"center\" id=\"28-16\" class=\"r16 c28\"></td><td width=\"50\" align=\"center\" id=\"29-16\" class=\"r16 c29\"></td><td width=\"50\" align=\"center\" id=\"30-16\" class=\"r16 c30\"></td><td width=\"50\" align=\"center\" id=\"31-16\" class=\"r16 c31\"></td><td width=\"50\" align=\"center\" id=\"32-16\" class=\"r16 c32\"></td><td width=\"50\" align=\"center\" id=\"33-16\" class=\"r16 c33\"></td><td width=\"50\" align=\"center\" id=\"34-16\" class=\"r16 c34\"></td><td width=\"50\" align=\"center\" id=\"35-16\" class=\"r16 c35\"></td><td width=\"50\" align=\"center\" id=\"36-16\" class=\"r16 c36\"></td><td width=\"50\" align=\"center\" id=\"37-16\" class=\"r16 c37\"></td><td width=\"50\" align=\"center\" id=\"38-16\" class=\"r16 c38\"></td><td width=\"50\" align=\"center\" id=\"39-16\" class=\"r16 c39\"></td><td width=\"50\" align=\"center\" id=\"40-16\" class=\"r16 c40\"></td></tr><tr id=\"row-17\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">18</td><td width=\"50\" align=\"center\" id=\"0-17\" class=\"r17 c0\"></td><td width=\"50\" align=\"center\" id=\"1-17\" class=\"r17 c1\"></td><td width=\"50\" align=\"center\" id=\"2-17\" class=\"r17 c2\"></td><td width=\"50\" align=\"center\" id=\"3-17\" class=\"r17 c3\"></td><td width=\"50\" align=\"center\" id=\"4-17\" class=\"r17 c4\"></td><td width=\"50\" align=\"center\" id=\"5-17\" class=\"r17 c5\"></td><td width=\"50\" align=\"center\" id=\"6-17\" class=\"r17 c6\"></td><td width=\"50\" align=\"center\" id=\"7-17\" class=\"r17 c7\"></td><td width=\"50\" align=\"center\" id=\"8-17\" class=\"r17 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-17\" class=\"r17 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-17\" class=\"r17 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-17\" class=\"r17 c11\"></td><td width=\"50\" align=\"center\" id=\"12-17\" class=\"r17 c12\"></td><td width=\"50\" align=\"center\" id=\"13-17\" class=\"r17 c13\"></td><td width=\"50\" align=\"center\" id=\"14-17\" class=\"r17 c14\"></td><td width=\"50\" align=\"center\" id=\"15-17\" class=\"r17 c15\"></td><td width=\"50\" align=\"center\" id=\"16-17\" class=\"r17 c16\"></td><td width=\"50\" align=\"center\" id=\"17-17\" class=\"r17 c17\"></td><td width=\"50\" align=\"center\" id=\"18-17\" class=\"r17 c18\"></td><td width=\"50\" align=\"center\" id=\"19-17\" class=\"r17 c19\"></td><td width=\"50\" align=\"center\" id=\"20-17\" class=\"r17 c20\"></td><td width=\"50\" align=\"center\" id=\"21-17\" class=\"r17 c21\"></td><td width=\"50\" align=\"center\" id=\"22-17\" class=\"r17 c22\"></td><td width=\"50\" align=\"center\" id=\"23-17\" class=\"r17 c23\"></td><td width=\"50\" align=\"center\" id=\"24-17\" class=\"r17 c24\"></td><td width=\"50\" align=\"center\" id=\"25-17\" class=\"r17 c25\"></td><td width=\"50\" align=\"center\" id=\"26-17\" class=\"r17 c26\"></td><td width=\"50\" align=\"center\" id=\"27-17\" class=\"r17 c27\"></td><td width=\"50\" align=\"center\" id=\"28-17\" class=\"r17 c28\"></td><td width=\"50\" align=\"center\" id=\"29-17\" class=\"r17 c29\"></td><td width=\"50\" align=\"center\" id=\"30-17\" class=\"r17 c30\"></td><td width=\"50\" align=\"center\" id=\"31-17\" class=\"r17 c31\"></td><td width=\"50\" align=\"center\" id=\"32-17\" class=\"r17 c32\"></td><td width=\"50\" align=\"center\" id=\"33-17\" class=\"r17 c33\"></td><td width=\"50\" align=\"center\" id=\"34-17\" class=\"r17 c34\"></td><td width=\"50\" align=\"center\" id=\"35-17\" class=\"r17 c35\"></td><td width=\"50\" align=\"center\" id=\"36-17\" class=\"r17 c36\"></td><td width=\"50\" align=\"center\" id=\"37-17\" class=\"r17 c37\"></td><td width=\"50\" align=\"center\" id=\"38-17\" class=\"r17 c38\"></td><td width=\"50\" align=\"center\" id=\"39-17\" class=\"r17 c39\"></td><td width=\"50\" align=\"center\" id=\"40-17\" class=\"r17 c40\"></td></tr><tr id=\"row-18\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">19</td><td width=\"50\" align=\"center\" id=\"0-18\" class=\"r18 c0\"></td><td width=\"50\" align=\"center\" id=\"1-18\" class=\"r18 c1\"></td><td width=\"50\" align=\"center\" id=\"2-18\" class=\"r18 c2\"></td><td width=\"50\" align=\"center\" id=\"3-18\" class=\"r18 c3\"></td><td width=\"50\" align=\"center\" id=\"4-18\" class=\"r18 c4\"></td><td width=\"50\" align=\"center\" id=\"5-18\" class=\"r18 c5\"></td><td width=\"50\" align=\"center\" id=\"6-18\" class=\"r18 c6\"></td><td width=\"50\" align=\"center\" id=\"7-18\" class=\"r18 c7\"></td><td width=\"50\" align=\"center\" id=\"8-18\" class=\"r18 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-18\" class=\"r18 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-18\" class=\"r18 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-18\" class=\"r18 c11\"></td><td width=\"50\" align=\"center\" id=\"12-18\" class=\"r18 c12\"></td><td width=\"50\" align=\"center\" id=\"13-18\" class=\"r18 c13\"></td><td width=\"50\" align=\"center\" id=\"14-18\" class=\"r18 c14\"></td><td width=\"50\" align=\"center\" id=\"15-18\" class=\"r18 c15\"></td><td width=\"50\" align=\"center\" id=\"16-18\" class=\"r18 c16\"></td><td width=\"50\" align=\"center\" id=\"17-18\" class=\"r18 c17\"></td><td width=\"50\" align=\"center\" id=\"18-18\" class=\"r18 c18\"></td><td width=\"50\" align=\"center\" id=\"19-18\" class=\"r18 c19\"></td><td width=\"50\" align=\"center\" id=\"20-18\" class=\"r18 c20\"></td><td width=\"50\" align=\"center\" id=\"21-18\" class=\"r18 c21\"></td><td width=\"50\" align=\"center\" id=\"22-18\" class=\"r18 c22\"></td><td width=\"50\" align=\"center\" id=\"23-18\" class=\"r18 c23\"></td><td width=\"50\" align=\"center\" id=\"24-18\" class=\"r18 c24\"></td><td width=\"50\" align=\"center\" id=\"25-18\" class=\"r18 c25\"></td><td width=\"50\" align=\"center\" id=\"26-18\" class=\"r18 c26\"></td><td width=\"50\" align=\"center\" id=\"27-18\" class=\"r18 c27\"></td><td width=\"50\" align=\"center\" id=\"28-18\" class=\"r18 c28\"></td><td width=\"50\" align=\"center\" id=\"29-18\" class=\"r18 c29\"></td><td width=\"50\" align=\"center\" id=\"30-18\" class=\"r18 c30\"></td><td width=\"50\" align=\"center\" id=\"31-18\" class=\"r18 c31\"></td><td width=\"50\" align=\"center\" id=\"32-18\" class=\"r18 c32\"></td><td width=\"50\" align=\"center\" id=\"33-18\" class=\"r18 c33\"></td><td width=\"50\" align=\"center\" id=\"34-18\" class=\"r18 c34\"></td><td width=\"50\" align=\"center\" id=\"35-18\" class=\"r18 c35\"></td><td width=\"50\" align=\"center\" id=\"36-18\" class=\"r18 c36\"></td><td width=\"50\" align=\"center\" id=\"37-18\" class=\"r18 c37\"></td><td width=\"50\" align=\"center\" id=\"38-18\" class=\"r18 c38\"></td><td width=\"50\" align=\"center\" id=\"39-18\" class=\"r18 c39\"></td><td width=\"50\" align=\"center\" id=\"40-18\" class=\"r18 c40\"></td></tr><tr id=\"row-19\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">20</td><td width=\"50\" align=\"center\" id=\"0-19\" class=\"r19 c0\"></td><td width=\"50\" align=\"center\" id=\"1-19\" class=\"r19 c1\"></td><td width=\"50\" align=\"center\" id=\"2-19\" class=\"r19 c2\"></td><td width=\"50\" align=\"center\" id=\"3-19\" class=\"r19 c3\"></td><td width=\"50\" align=\"center\" id=\"4-19\" class=\"r19 c4\"></td><td width=\"50\" align=\"center\" id=\"5-19\" class=\"r19 c5\"></td><td width=\"50\" align=\"center\" id=\"6-19\" class=\"r19 c6\"></td><td width=\"50\" align=\"center\" id=\"7-19\" class=\"r19 c7\"></td><td width=\"50\" align=\"center\" id=\"8-19\" class=\"r19 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-19\" class=\"r19 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-19\" class=\"r19 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-19\" class=\"r19 c11\"></td><td width=\"50\" align=\"center\" id=\"12-19\" class=\"r19 c12\"></td><td width=\"50\" align=\"center\" id=\"13-19\" class=\"r19 c13\"></td><td width=\"50\" align=\"center\" id=\"14-19\" class=\"r19 c14\"></td><td width=\"50\" align=\"center\" id=\"15-19\" class=\"r19 c15\"></td><td width=\"50\" align=\"center\" id=\"16-19\" class=\"r19 c16\"></td><td width=\"50\" align=\"center\" id=\"17-19\" class=\"r19 c17\"></td><td width=\"50\" align=\"center\" id=\"18-19\" class=\"r19 c18\"></td><td width=\"50\" align=\"center\" id=\"19-19\" class=\"r19 c19\"></td><td width=\"50\" align=\"center\" id=\"20-19\" class=\"r19 c20\"></td><td width=\"50\" align=\"center\" id=\"21-19\" class=\"r19 c21\"></td><td width=\"50\" align=\"center\" id=\"22-19\" class=\"r19 c22\"></td><td width=\"50\" align=\"center\" id=\"23-19\" class=\"r19 c23\"></td><td width=\"50\" align=\"center\" id=\"24-19\" class=\"r19 c24\"></td><td width=\"50\" align=\"center\" id=\"25-19\" class=\"r19 c25\"></td><td width=\"50\" align=\"center\" id=\"26-19\" class=\"r19 c26\"></td><td width=\"50\" align=\"center\" id=\"27-19\" class=\"r19 c27\"></td><td width=\"50\" align=\"center\" id=\"28-19\" class=\"r19 c28\"></td><td width=\"50\" align=\"center\" id=\"29-19\" class=\"r19 c29\"></td><td width=\"50\" align=\"center\" id=\"30-19\" class=\"r19 c30\"></td><td width=\"50\" align=\"center\" id=\"31-19\" class=\"r19 c31\"></td><td width=\"50\" align=\"center\" id=\"32-19\" class=\"r19 c32\"></td><td width=\"50\" align=\"center\" id=\"33-19\" class=\"r19 c33\"></td><td width=\"50\" align=\"center\" id=\"34-19\" class=\"r19 c34\"></td><td width=\"50\" align=\"center\" id=\"35-19\" class=\"r19 c35\"></td><td width=\"50\" align=\"center\" id=\"36-19\" class=\"r19 c36\"></td><td width=\"50\" align=\"center\" id=\"37-19\" class=\"r19 c37\"></td><td width=\"50\" align=\"center\" id=\"38-19\" class=\"r19 c38\"></td><td width=\"50\" align=\"center\" id=\"39-19\" class=\"r19 c39\"></td><td width=\"50\" align=\"center\" id=\"40-19\" class=\"r19 c40\"></td></tr><tr id=\"row-20\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">21</td><td width=\"50\" align=\"center\" id=\"0-20\" class=\"r20 c0\"></td><td width=\"50\" align=\"center\" id=\"1-20\" class=\"r20 c1\"></td><td width=\"50\" align=\"center\" id=\"2-20\" class=\"r20 c2\"></td><td width=\"50\" align=\"center\" id=\"3-20\" class=\"r20 c3\"></td><td width=\"50\" align=\"center\" id=\"4-20\" class=\"r20 c4\"></td><td width=\"50\" align=\"center\" id=\"5-20\" class=\"r20 c5\"></td><td width=\"50\" align=\"center\" id=\"6-20\" class=\"r20 c6\"></td><td width=\"50\" align=\"center\" id=\"7-20\" class=\"r20 c7\"></td><td width=\"50\" align=\"center\" id=\"8-20\" class=\"r20 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-20\" class=\"r20 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-20\" class=\"r20 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-20\" class=\"r20 c11\"></td><td width=\"50\" align=\"center\" id=\"12-20\" class=\"r20 c12\"></td><td width=\"50\" align=\"center\" id=\"13-20\" class=\"r20 c13\"></td><td width=\"50\" align=\"center\" id=\"14-20\" class=\"r20 c14\"></td><td width=\"50\" align=\"center\" id=\"15-20\" class=\"r20 c15\"></td><td width=\"50\" align=\"center\" id=\"16-20\" class=\"r20 c16\"></td><td width=\"50\" align=\"center\" id=\"17-20\" class=\"r20 c17\"></td><td width=\"50\" align=\"center\" id=\"18-20\" class=\"r20 c18\"></td><td width=\"50\" align=\"center\" id=\"19-20\" class=\"r20 c19\"></td><td width=\"50\" align=\"center\" id=\"20-20\" class=\"r20 c20\"></td><td width=\"50\" align=\"center\" id=\"21-20\" class=\"r20 c21\"></td><td width=\"50\" align=\"center\" id=\"22-20\" class=\"r20 c22\"></td><td width=\"50\" align=\"center\" id=\"23-20\" class=\"r20 c23\"></td><td width=\"50\" align=\"center\" id=\"24-20\" class=\"r20 c24\"></td><td width=\"50\" align=\"center\" id=\"25-20\" class=\"r20 c25\"></td><td width=\"50\" align=\"center\" id=\"26-20\" class=\"r20 c26\"></td><td width=\"50\" align=\"center\" id=\"27-20\" class=\"r20 c27\"></td><td width=\"50\" align=\"center\" id=\"28-20\" class=\"r20 c28\"></td><td width=\"50\" align=\"center\" id=\"29-20\" class=\"r20 c29\"></td><td width=\"50\" align=\"center\" id=\"30-20\" class=\"r20 c30\"></td><td width=\"50\" align=\"center\" id=\"31-20\" class=\"r20 c31\"></td><td width=\"50\" align=\"center\" id=\"32-20\" class=\"r20 c32\"></td><td width=\"50\" align=\"center\" id=\"33-20\" class=\"r20 c33\"></td><td width=\"50\" align=\"center\" id=\"34-20\" class=\"r20 c34\"></td><td width=\"50\" align=\"center\" id=\"35-20\" class=\"r20 c35\"></td><td width=\"50\" align=\"center\" id=\"36-20\" class=\"r20 c36\"></td><td width=\"50\" align=\"center\" id=\"37-20\" class=\"r20 c37\"></td><td width=\"50\" align=\"center\" id=\"38-20\" class=\"r20 c38\"></td><td width=\"50\" align=\"center\" id=\"39-20\" class=\"r20 c39\"></td><td width=\"50\" align=\"center\" id=\"40-20\" class=\"r20 c40\"></td></tr><tr id=\"row-21\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">22</td><td width=\"50\" align=\"center\" id=\"0-21\" class=\"r21 c0\"></td><td width=\"50\" align=\"center\" id=\"1-21\" class=\"r21 c1\"></td><td width=\"50\" align=\"center\" id=\"2-21\" class=\"r21 c2\"></td><td width=\"50\" align=\"center\" id=\"3-21\" class=\"r21 c3\"></td><td width=\"50\" align=\"center\" id=\"4-21\" class=\"r21 c4\"></td><td width=\"50\" align=\"center\" id=\"5-21\" class=\"r21 c5\"></td><td width=\"50\" align=\"center\" id=\"6-21\" class=\"r21 c6\"></td><td width=\"50\" align=\"center\" id=\"7-21\" class=\"r21 c7\"></td><td width=\"50\" align=\"center\" id=\"8-21\" class=\"r21 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-21\" class=\"r21 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-21\" class=\"r21 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-21\" class=\"r21 c11\"></td><td width=\"50\" align=\"center\" id=\"12-21\" class=\"r21 c12\"></td><td width=\"50\" align=\"center\" id=\"13-21\" class=\"r21 c13\"></td><td width=\"50\" align=\"center\" id=\"14-21\" class=\"r21 c14\"></td><td width=\"50\" align=\"center\" id=\"15-21\" class=\"r21 c15\"></td><td width=\"50\" align=\"center\" id=\"16-21\" class=\"r21 c16\"></td><td width=\"50\" align=\"center\" id=\"17-21\" class=\"r21 c17\"></td><td width=\"50\" align=\"center\" id=\"18-21\" class=\"r21 c18\"></td><td width=\"50\" align=\"center\" id=\"19-21\" class=\"r21 c19\"></td><td width=\"50\" align=\"center\" id=\"20-21\" class=\"r21 c20\"></td><td width=\"50\" align=\"center\" id=\"21-21\" class=\"r21 c21\"></td><td width=\"50\" align=\"center\" id=\"22-21\" class=\"r21 c22\"></td><td width=\"50\" align=\"center\" id=\"23-21\" class=\"r21 c23\"></td><td width=\"50\" align=\"center\" id=\"24-21\" class=\"r21 c24\"></td><td width=\"50\" align=\"center\" id=\"25-21\" class=\"r21 c25\"></td><td width=\"50\" align=\"center\" id=\"26-21\" class=\"r21 c26\"></td><td width=\"50\" align=\"center\" id=\"27-21\" class=\"r21 c27\"></td><td width=\"50\" align=\"center\" id=\"28-21\" class=\"r21 c28\"></td><td width=\"50\" align=\"center\" id=\"29-21\" class=\"r21 c29\"></td><td width=\"50\" align=\"center\" id=\"30-21\" class=\"r21 c30\"></td><td width=\"50\" align=\"center\" id=\"31-21\" class=\"r21 c31\"></td><td width=\"50\" align=\"center\" id=\"32-21\" class=\"r21 c32\"></td><td width=\"50\" align=\"center\" id=\"33-21\" class=\"r21 c33\"></td><td width=\"50\" align=\"center\" id=\"34-21\" class=\"r21 c34\"></td><td width=\"50\" align=\"center\" id=\"35-21\" class=\"r21 c35\"></td><td width=\"50\" align=\"center\" id=\"36-21\" class=\"r21 c36\"></td><td width=\"50\" align=\"center\" id=\"37-21\" class=\"r21 c37\"></td><td width=\"50\" align=\"center\" id=\"38-21\" class=\"r21 c38\"></td><td width=\"50\" align=\"center\" id=\"39-21\" class=\"r21 c39\"></td><td width=\"50\" align=\"center\" id=\"40-21\" class=\"r21 c40\"></td></tr><tr id=\"row-22\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">23</td><td width=\"50\" align=\"center\" id=\"0-22\" class=\"r22 c0\"></td><td width=\"50\" align=\"center\" id=\"1-22\" class=\"r22 c1\"></td><td width=\"50\" align=\"center\" id=\"2-22\" class=\"r22 c2\"></td><td width=\"50\" align=\"center\" id=\"3-22\" class=\"r22 c3\"></td><td width=\"50\" align=\"center\" id=\"4-22\" class=\"r22 c4\"></td><td width=\"50\" align=\"center\" id=\"5-22\" class=\"r22 c5\"></td><td width=\"50\" align=\"center\" id=\"6-22\" class=\"r22 c6\"></td><td width=\"50\" align=\"center\" id=\"7-22\" class=\"r22 c7\"></td><td width=\"50\" align=\"center\" id=\"8-22\" class=\"r22 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-22\" class=\"r22 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-22\" class=\"r22 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-22\" class=\"r22 c11\"></td><td width=\"50\" align=\"center\" id=\"12-22\" class=\"r22 c12\"></td><td width=\"50\" align=\"center\" id=\"13-22\" class=\"r22 c13\"></td><td width=\"50\" align=\"center\" id=\"14-22\" class=\"r22 c14\"></td><td width=\"50\" align=\"center\" id=\"15-22\" class=\"r22 c15\"></td><td width=\"50\" align=\"center\" id=\"16-22\" class=\"r22 c16\"></td><td width=\"50\" align=\"center\" id=\"17-22\" class=\"r22 c17\"></td><td width=\"50\" align=\"center\" id=\"18-22\" class=\"r22 c18\"></td><td width=\"50\" align=\"center\" id=\"19-22\" class=\"r22 c19\"></td><td width=\"50\" align=\"center\" id=\"20-22\" class=\"r22 c20\"></td><td width=\"50\" align=\"center\" id=\"21-22\" class=\"r22 c21\"></td><td width=\"50\" align=\"center\" id=\"22-22\" class=\"r22 c22\"></td><td width=\"50\" align=\"center\" id=\"23-22\" class=\"r22 c23\"></td><td width=\"50\" align=\"center\" id=\"24-22\" class=\"r22 c24\"></td><td width=\"50\" align=\"center\" id=\"25-22\" class=\"r22 c25\"></td><td width=\"50\" align=\"center\" id=\"26-22\" class=\"r22 c26\"></td><td width=\"50\" align=\"center\" id=\"27-22\" class=\"r22 c27\"></td><td width=\"50\" align=\"center\" id=\"28-22\" class=\"r22 c28\"></td><td width=\"50\" align=\"center\" id=\"29-22\" class=\"r22 c29\"></td><td width=\"50\" align=\"center\" id=\"30-22\" class=\"r22 c30\"></td><td width=\"50\" align=\"center\" id=\"31-22\" class=\"r22 c31\"></td><td width=\"50\" align=\"center\" id=\"32-22\" class=\"r22 c32\"></td><td width=\"50\" align=\"center\" id=\"33-22\" class=\"r22 c33\"></td><td width=\"50\" align=\"center\" id=\"34-22\" class=\"r22 c34\"></td><td width=\"50\" align=\"center\" id=\"35-22\" class=\"r22 c35\"></td><td width=\"50\" align=\"center\" id=\"36-22\" class=\"r22 c36\"></td><td width=\"50\" align=\"center\" id=\"37-22\" class=\"r22 c37\"></td><td width=\"50\" align=\"center\" id=\"38-22\" class=\"r22 c38\"></td><td width=\"50\" align=\"center\" id=\"39-22\" class=\"r22 c39\"></td><td width=\"50\" align=\"center\" id=\"40-22\" class=\"r22 c40\"></td></tr><tr id=\"row-23\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">24</td><td width=\"50\" align=\"center\" id=\"0-23\" class=\"r23 c0\"></td><td width=\"50\" align=\"center\" id=\"1-23\" class=\"r23 c1\"></td><td width=\"50\" align=\"center\" id=\"2-23\" class=\"r23 c2\"></td><td width=\"50\" align=\"center\" id=\"3-23\" class=\"r23 c3\"></td><td width=\"50\" align=\"center\" id=\"4-23\" class=\"r23 c4\"></td><td width=\"50\" align=\"center\" id=\"5-23\" class=\"r23 c5\"></td><td width=\"50\" align=\"center\" id=\"6-23\" class=\"r23 c6\"></td><td width=\"50\" align=\"center\" id=\"7-23\" class=\"r23 c7\"></td><td width=\"50\" align=\"center\" id=\"8-23\" class=\"r23 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-23\" class=\"r23 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-23\" class=\"r23 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-23\" class=\"r23 c11\"></td><td width=\"50\" align=\"center\" id=\"12-23\" class=\"r23 c12\"></td><td width=\"50\" align=\"center\" id=\"13-23\" class=\"r23 c13\"></td><td width=\"50\" align=\"center\" id=\"14-23\" class=\"r23 c14\"></td><td width=\"50\" align=\"center\" id=\"15-23\" class=\"r23 c15\"></td><td width=\"50\" align=\"center\" id=\"16-23\" class=\"r23 c16\"></td><td width=\"50\" align=\"center\" id=\"17-23\" class=\"r23 c17\"></td><td width=\"50\" align=\"center\" id=\"18-23\" class=\"r23 c18\"></td><td width=\"50\" align=\"center\" id=\"19-23\" class=\"r23 c19\"></td><td width=\"50\" align=\"center\" id=\"20-23\" class=\"r23 c20\"></td><td width=\"50\" align=\"center\" id=\"21-23\" class=\"r23 c21\"></td><td width=\"50\" align=\"center\" id=\"22-23\" class=\"r23 c22\"></td><td width=\"50\" align=\"center\" id=\"23-23\" class=\"r23 c23\"></td><td width=\"50\" align=\"center\" id=\"24-23\" class=\"r23 c24\"></td><td width=\"50\" align=\"center\" id=\"25-23\" class=\"r23 c25\"></td><td width=\"50\" align=\"center\" id=\"26-23\" class=\"r23 c26\"></td><td width=\"50\" align=\"center\" id=\"27-23\" class=\"r23 c27\"></td><td width=\"50\" align=\"center\" id=\"28-23\" class=\"r23 c28\"></td><td width=\"50\" align=\"center\" id=\"29-23\" class=\"r23 c29\"></td><td width=\"50\" align=\"center\" id=\"30-23\" class=\"r23 c30\"></td><td width=\"50\" align=\"center\" id=\"31-23\" class=\"r23 c31\"></td><td width=\"50\" align=\"center\" id=\"32-23\" class=\"r23 c32\"></td><td width=\"50\" align=\"center\" id=\"33-23\" class=\"r23 c33\"></td><td width=\"50\" align=\"center\" id=\"34-23\" class=\"r23 c34\"></td><td width=\"50\" align=\"center\" id=\"35-23\" class=\"r23 c35\"></td><td width=\"50\" align=\"center\" id=\"36-23\" class=\"r23 c36\"></td><td width=\"50\" align=\"center\" id=\"37-23\" class=\"r23 c37\"></td><td width=\"50\" align=\"center\" id=\"38-23\" class=\"r23 c38\"></td><td width=\"50\" align=\"center\" id=\"39-23\" class=\"r23 c39\"></td><td width=\"50\" align=\"center\" id=\"40-23\" class=\"r23 c40\"></td></tr><tr id=\"row-24\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">25</td><td width=\"50\" align=\"center\" id=\"0-24\" class=\"r24 c0\"></td><td width=\"50\" align=\"center\" id=\"1-24\" class=\"r24 c1\"></td><td width=\"50\" align=\"center\" id=\"2-24\" class=\"r24 c2\"></td><td width=\"50\" align=\"center\" id=\"3-24\" class=\"r24 c3\"></td><td width=\"50\" align=\"center\" id=\"4-24\" class=\"r24 c4\"></td><td width=\"50\" align=\"center\" id=\"5-24\" class=\"r24 c5\"></td><td width=\"50\" align=\"center\" id=\"6-24\" class=\"r24 c6\"></td><td width=\"50\" align=\"center\" id=\"7-24\" class=\"r24 c7\"></td><td width=\"50\" align=\"center\" id=\"8-24\" class=\"r24 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-24\" class=\"r24 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-24\" class=\"r24 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-24\" class=\"r24 c11\"></td><td width=\"50\" align=\"center\" id=\"12-24\" class=\"r24 c12\"></td><td width=\"50\" align=\"center\" id=\"13-24\" class=\"r24 c13\"></td><td width=\"50\" align=\"center\" id=\"14-24\" class=\"r24 c14\"></td><td width=\"50\" align=\"center\" id=\"15-24\" class=\"r24 c15\"></td><td width=\"50\" align=\"center\" id=\"16-24\" class=\"r24 c16\"></td><td width=\"50\" align=\"center\" id=\"17-24\" class=\"r24 c17\"></td><td width=\"50\" align=\"center\" id=\"18-24\" class=\"r24 c18\"></td><td width=\"50\" align=\"center\" id=\"19-24\" class=\"r24 c19\"></td><td width=\"50\" align=\"center\" id=\"20-24\" class=\"r24 c20\"></td><td width=\"50\" align=\"center\" id=\"21-24\" class=\"r24 c21\"></td><td width=\"50\" align=\"center\" id=\"22-24\" class=\"r24 c22\"></td><td width=\"50\" align=\"center\" id=\"23-24\" class=\"r24 c23\"></td><td width=\"50\" align=\"center\" id=\"24-24\" class=\"r24 c24\"></td><td width=\"50\" align=\"center\" id=\"25-24\" class=\"r24 c25\"></td><td width=\"50\" align=\"center\" id=\"26-24\" class=\"r24 c26\"></td><td width=\"50\" align=\"center\" id=\"27-24\" class=\"r24 c27\"></td><td width=\"50\" align=\"center\" id=\"28-24\" class=\"r24 c28\"></td><td width=\"50\" align=\"center\" id=\"29-24\" class=\"r24 c29\"></td><td width=\"50\" align=\"center\" id=\"30-24\" class=\"r24 c30\"></td><td width=\"50\" align=\"center\" id=\"31-24\" class=\"r24 c31\"></td><td width=\"50\" align=\"center\" id=\"32-24\" class=\"r24 c32\"></td><td width=\"50\" align=\"center\" id=\"33-24\" class=\"r24 c33\"></td><td width=\"50\" align=\"center\" id=\"34-24\" class=\"r24 c34\"></td><td width=\"50\" align=\"center\" id=\"35-24\" class=\"r24 c35\"></td><td width=\"50\" align=\"center\" id=\"36-24\" class=\"r24 c36\"></td><td width=\"50\" align=\"center\" id=\"37-24\" class=\"r24 c37\"></td><td width=\"50\" align=\"center\" id=\"38-24\" class=\"r24 c38\"></td><td width=\"50\" align=\"center\" id=\"39-24\" class=\"r24 c39\"></td><td width=\"50\" align=\"center\" id=\"40-24\" class=\"r24 c40\"></td></tr><tr id=\"row-25\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">26</td><td width=\"50\" align=\"center\" id=\"0-25\" class=\"r25 c0\"></td><td width=\"50\" align=\"center\" id=\"1-25\" class=\"r25 c1\"></td><td width=\"50\" align=\"center\" id=\"2-25\" class=\"r25 c2\"></td><td width=\"50\" align=\"center\" id=\"3-25\" class=\"r25 c3\"></td><td width=\"50\" align=\"center\" id=\"4-25\" class=\"r25 c4\"></td><td width=\"50\" align=\"center\" id=\"5-25\" class=\"r25 c5\"></td><td width=\"50\" align=\"center\" id=\"6-25\" class=\"r25 c6\"></td><td width=\"50\" align=\"center\" id=\"7-25\" class=\"r25 c7\"></td><td width=\"50\" align=\"center\" id=\"8-25\" class=\"r25 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-25\" class=\"r25 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-25\" class=\"r25 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-25\" class=\"r25 c11\"></td><td width=\"50\" align=\"center\" id=\"12-25\" class=\"r25 c12\"></td><td width=\"50\" align=\"center\" id=\"13-25\" class=\"r25 c13\"></td><td width=\"50\" align=\"center\" id=\"14-25\" class=\"r25 c14\"></td><td width=\"50\" align=\"center\" id=\"15-25\" class=\"r25 c15\"></td><td width=\"50\" align=\"center\" id=\"16-25\" class=\"r25 c16\"></td><td width=\"50\" align=\"center\" id=\"17-25\" class=\"r25 c17\"></td><td width=\"50\" align=\"center\" id=\"18-25\" class=\"r25 c18\"></td><td width=\"50\" align=\"center\" id=\"19-25\" class=\"r25 c19\"></td><td width=\"50\" align=\"center\" id=\"20-25\" class=\"r25 c20\"></td><td width=\"50\" align=\"center\" id=\"21-25\" class=\"r25 c21\"></td><td width=\"50\" align=\"center\" id=\"22-25\" class=\"r25 c22\"></td><td width=\"50\" align=\"center\" id=\"23-25\" class=\"r25 c23\"></td><td width=\"50\" align=\"center\" id=\"24-25\" class=\"r25 c24\"></td><td width=\"50\" align=\"center\" id=\"25-25\" class=\"r25 c25\"></td><td width=\"50\" align=\"center\" id=\"26-25\" class=\"r25 c26\"></td><td width=\"50\" align=\"center\" id=\"27-25\" class=\"r25 c27\"></td><td width=\"50\" align=\"center\" id=\"28-25\" class=\"r25 c28\"></td><td width=\"50\" align=\"center\" id=\"29-25\" class=\"r25 c29\"></td><td width=\"50\" align=\"center\" id=\"30-25\" class=\"r25 c30\"></td><td width=\"50\" align=\"center\" id=\"31-25\" class=\"r25 c31\"></td><td width=\"50\" align=\"center\" id=\"32-25\" class=\"r25 c32\"></td><td width=\"50\" align=\"center\" id=\"33-25\" class=\"r25 c33\"></td><td width=\"50\" align=\"center\" id=\"34-25\" class=\"r25 c34\"></td><td width=\"50\" align=\"center\" id=\"35-25\" class=\"r25 c35\"></td><td width=\"50\" align=\"center\" id=\"36-25\" class=\"r25 c36\"></td><td width=\"50\" align=\"center\" id=\"37-25\" class=\"r25 c37\"></td><td width=\"50\" align=\"center\" id=\"38-25\" class=\"r25 c38\"></td><td width=\"50\" align=\"center\" id=\"39-25\" class=\"r25 c39\"></td><td width=\"50\" align=\"center\" id=\"40-25\" class=\"r25 c40\"></td></tr><tr id=\"row-26\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">27</td><td width=\"50\" align=\"center\" id=\"0-26\" class=\"r26 c0\"></td><td width=\"50\" align=\"center\" id=\"1-26\" class=\"r26 c1\"></td><td width=\"50\" align=\"center\" id=\"2-26\" class=\"r26 c2\"></td><td width=\"50\" align=\"center\" id=\"3-26\" class=\"r26 c3\"></td><td width=\"50\" align=\"center\" id=\"4-26\" class=\"r26 c4\"></td><td width=\"50\" align=\"center\" id=\"5-26\" class=\"r26 c5\"></td><td width=\"50\" align=\"center\" id=\"6-26\" class=\"r26 c6\"></td><td width=\"50\" align=\"center\" id=\"7-26\" class=\"r26 c7\"></td><td width=\"50\" align=\"center\" id=\"8-26\" class=\"r26 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-26\" class=\"r26 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-26\" class=\"r26 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-26\" class=\"r26 c11\"></td><td width=\"50\" align=\"center\" id=\"12-26\" class=\"r26 c12\"></td><td width=\"50\" align=\"center\" id=\"13-26\" class=\"r26 c13\"></td><td width=\"50\" align=\"center\" id=\"14-26\" class=\"r26 c14\"></td><td width=\"50\" align=\"center\" id=\"15-26\" class=\"r26 c15\"></td><td width=\"50\" align=\"center\" id=\"16-26\" class=\"r26 c16\"></td><td width=\"50\" align=\"center\" id=\"17-26\" class=\"r26 c17\"></td><td width=\"50\" align=\"center\" id=\"18-26\" class=\"r26 c18\"></td><td width=\"50\" align=\"center\" id=\"19-26\" class=\"r26 c19\"></td><td width=\"50\" align=\"center\" id=\"20-26\" class=\"r26 c20\"></td><td width=\"50\" align=\"center\" id=\"21-26\" class=\"r26 c21\"></td><td width=\"50\" align=\"center\" id=\"22-26\" class=\"r26 c22\"></td><td width=\"50\" align=\"center\" id=\"23-26\" class=\"r26 c23\"></td><td width=\"50\" align=\"center\" id=\"24-26\" class=\"r26 c24\"></td><td width=\"50\" align=\"center\" id=\"25-26\" class=\"r26 c25\"></td><td width=\"50\" align=\"center\" id=\"26-26\" class=\"r26 c26\"></td><td width=\"50\" align=\"center\" id=\"27-26\" class=\"r26 c27\"></td><td width=\"50\" align=\"center\" id=\"28-26\" class=\"r26 c28\"></td><td width=\"50\" align=\"center\" id=\"29-26\" class=\"r26 c29\"></td><td width=\"50\" align=\"center\" id=\"30-26\" class=\"r26 c30\"></td><td width=\"50\" align=\"center\" id=\"31-26\" class=\"r26 c31\"></td><td width=\"50\" align=\"center\" id=\"32-26\" class=\"r26 c32\"></td><td width=\"50\" align=\"center\" id=\"33-26\" class=\"r26 c33\"></td><td width=\"50\" align=\"center\" id=\"34-26\" class=\"r26 c34\"></td><td width=\"50\" align=\"center\" id=\"35-26\" class=\"r26 c35\"></td><td width=\"50\" align=\"center\" id=\"36-26\" class=\"r26 c36\"></td><td width=\"50\" align=\"center\" id=\"37-26\" class=\"r26 c37\"></td><td width=\"50\" align=\"center\" id=\"38-26\" class=\"r26 c38\"></td><td width=\"50\" align=\"center\" id=\"39-26\" class=\"r26 c39\"></td><td width=\"50\" align=\"center\" id=\"40-26\" class=\"r26 c40\"></td></tr><tr id=\"row-27\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">28</td><td width=\"50\" align=\"center\" id=\"0-27\" class=\"r27 c0\"></td><td width=\"50\" align=\"center\" id=\"1-27\" class=\"r27 c1\"></td><td width=\"50\" align=\"center\" id=\"2-27\" class=\"r27 c2\"></td><td width=\"50\" align=\"center\" id=\"3-27\" class=\"r27 c3\"></td><td width=\"50\" align=\"center\" id=\"4-27\" class=\"r27 c4\"></td><td width=\"50\" align=\"center\" id=\"5-27\" class=\"r27 c5\"></td><td width=\"50\" align=\"center\" id=\"6-27\" class=\"r27 c6\"></td><td width=\"50\" align=\"center\" id=\"7-27\" class=\"r27 c7\"></td><td width=\"50\" align=\"center\" id=\"8-27\" class=\"r27 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-27\" class=\"r27 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-27\" class=\"r27 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-27\" class=\"r27 c11\"></td><td width=\"50\" align=\"center\" id=\"12-27\" class=\"r27 c12\"></td><td width=\"50\" align=\"center\" id=\"13-27\" class=\"r27 c13\"></td><td width=\"50\" align=\"center\" id=\"14-27\" class=\"r27 c14\"></td><td width=\"50\" align=\"center\" id=\"15-27\" class=\"r27 c15\"></td><td width=\"50\" align=\"center\" id=\"16-27\" class=\"r27 c16\"></td><td width=\"50\" align=\"center\" id=\"17-27\" class=\"r27 c17\"></td><td width=\"50\" align=\"center\" id=\"18-27\" class=\"r27 c18\"></td><td width=\"50\" align=\"center\" id=\"19-27\" class=\"r27 c19\"></td><td width=\"50\" align=\"center\" id=\"20-27\" class=\"r27 c20\"></td><td width=\"50\" align=\"center\" id=\"21-27\" class=\"r27 c21\"></td><td width=\"50\" align=\"center\" id=\"22-27\" class=\"r27 c22\"></td><td width=\"50\" align=\"center\" id=\"23-27\" class=\"r27 c23\"></td><td width=\"50\" align=\"center\" id=\"24-27\" class=\"r27 c24\"></td><td width=\"50\" align=\"center\" id=\"25-27\" class=\"r27 c25\"></td><td width=\"50\" align=\"center\" id=\"26-27\" class=\"r27 c26\"></td><td width=\"50\" align=\"center\" id=\"27-27\" class=\"r27 c27\"></td><td width=\"50\" align=\"center\" id=\"28-27\" class=\"r27 c28\"></td><td width=\"50\" align=\"center\" id=\"29-27\" class=\"r27 c29\"></td><td width=\"50\" align=\"center\" id=\"30-27\" class=\"r27 c30\"></td><td width=\"50\" align=\"center\" id=\"31-27\" class=\"r27 c31\"></td><td width=\"50\" align=\"center\" id=\"32-27\" class=\"r27 c32\"></td><td width=\"50\" align=\"center\" id=\"33-27\" class=\"r27 c33\"></td><td width=\"50\" align=\"center\" id=\"34-27\" class=\"r27 c34\"></td><td width=\"50\" align=\"center\" id=\"35-27\" class=\"r27 c35\"></td><td width=\"50\" align=\"center\" id=\"36-27\" class=\"r27 c36\"></td><td width=\"50\" align=\"center\" id=\"37-27\" class=\"r27 c37\"></td><td width=\"50\" align=\"center\" id=\"38-27\" class=\"r27 c38\"></td><td width=\"50\" align=\"center\" id=\"39-27\" class=\"r27 c39\"></td><td width=\"50\" align=\"center\" id=\"40-27\" class=\"r27 c40\"></td></tr><tr id=\"row-28\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">29</td><td width=\"50\" align=\"center\" id=\"0-28\" class=\"r28 c0\"></td><td width=\"50\" align=\"center\" id=\"1-28\" class=\"r28 c1\"></td><td width=\"50\" align=\"center\" id=\"2-28\" class=\"r28 c2\"></td><td width=\"50\" align=\"center\" id=\"3-28\" class=\"r28 c3\"></td><td width=\"50\" align=\"center\" id=\"4-28\" class=\"r28 c4\"></td><td width=\"50\" align=\"center\" id=\"5-28\" class=\"r28 c5\"></td><td width=\"50\" align=\"center\" id=\"6-28\" class=\"r28 c6\"></td><td width=\"50\" align=\"center\" id=\"7-28\" class=\"r28 c7\"></td><td width=\"50\" align=\"center\" id=\"8-28\" class=\"r28 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-28\" class=\"r28 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-28\" class=\"r28 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-28\" class=\"r28 c11\"></td><td width=\"50\" align=\"center\" id=\"12-28\" class=\"r28 c12\"></td><td width=\"50\" align=\"center\" id=\"13-28\" class=\"r28 c13\"></td><td width=\"50\" align=\"center\" id=\"14-28\" class=\"r28 c14\"></td><td width=\"50\" align=\"center\" id=\"15-28\" class=\"r28 c15\"></td><td width=\"50\" align=\"center\" id=\"16-28\" class=\"r28 c16\"></td><td width=\"50\" align=\"center\" id=\"17-28\" class=\"r28 c17\"></td><td width=\"50\" align=\"center\" id=\"18-28\" class=\"r28 c18\"></td><td width=\"50\" align=\"center\" id=\"19-28\" class=\"r28 c19\"></td><td width=\"50\" align=\"center\" id=\"20-28\" class=\"r28 c20\"></td><td width=\"50\" align=\"center\" id=\"21-28\" class=\"r28 c21\"></td><td width=\"50\" align=\"center\" id=\"22-28\" class=\"r28 c22\"></td><td width=\"50\" align=\"center\" id=\"23-28\" class=\"r28 c23\"></td><td width=\"50\" align=\"center\" id=\"24-28\" class=\"r28 c24\"></td><td width=\"50\" align=\"center\" id=\"25-28\" class=\"r28 c25\"></td><td width=\"50\" align=\"center\" id=\"26-28\" class=\"r28 c26\"></td><td width=\"50\" align=\"center\" id=\"27-28\" class=\"r28 c27\"></td><td width=\"50\" align=\"center\" id=\"28-28\" class=\"r28 c28\"></td><td width=\"50\" align=\"center\" id=\"29-28\" class=\"r28 c29\"></td><td width=\"50\" align=\"center\" id=\"30-28\" class=\"r28 c30\"></td><td width=\"50\" align=\"center\" id=\"31-28\" class=\"r28 c31\"></td><td width=\"50\" align=\"center\" id=\"32-28\" class=\"r28 c32\"></td><td width=\"50\" align=\"center\" id=\"33-28\" class=\"r28 c33\"></td><td width=\"50\" align=\"center\" id=\"34-28\" class=\"r28 c34\"></td><td width=\"50\" align=\"center\" id=\"35-28\" class=\"r28 c35\"></td><td width=\"50\" align=\"center\" id=\"36-28\" class=\"r28 c36\"></td><td width=\"50\" align=\"center\" id=\"37-28\" class=\"r28 c37\"></td><td width=\"50\" align=\"center\" id=\"38-28\" class=\"r28 c38\"></td><td width=\"50\" align=\"center\" id=\"39-28\" class=\"r28 c39\"></td><td width=\"50\" align=\"center\" id=\"40-28\" class=\"r28 c40\"></td></tr><tr id=\"row-29\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">30</td><td width=\"50\" align=\"center\" id=\"0-29\" class=\"r29 c0\"></td><td width=\"50\" align=\"center\" id=\"1-29\" class=\"r29 c1\"></td><td width=\"50\" align=\"center\" id=\"2-29\" class=\"r29 c2\"></td><td width=\"50\" align=\"center\" id=\"3-29\" class=\"r29 c3\"></td><td width=\"50\" align=\"center\" id=\"4-29\" class=\"r29 c4\"></td><td width=\"50\" align=\"center\" id=\"5-29\" class=\"r29 c5\"></td><td width=\"50\" align=\"center\" id=\"6-29\" class=\"r29 c6\"></td><td width=\"50\" align=\"center\" id=\"7-29\" class=\"r29 c7\"></td><td width=\"50\" align=\"center\" id=\"8-29\" class=\"r29 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-29\" class=\"r29 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-29\" class=\"r29 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-29\" class=\"r29 c11\"></td><td width=\"50\" align=\"center\" id=\"12-29\" class=\"r29 c12\"></td><td width=\"50\" align=\"center\" id=\"13-29\" class=\"r29 c13\"></td><td width=\"50\" align=\"center\" id=\"14-29\" class=\"r29 c14\"></td><td width=\"50\" align=\"center\" id=\"15-29\" class=\"r29 c15\"></td><td width=\"50\" align=\"center\" id=\"16-29\" class=\"r29 c16\"></td><td width=\"50\" align=\"center\" id=\"17-29\" class=\"r29 c17\"></td><td width=\"50\" align=\"center\" id=\"18-29\" class=\"r29 c18\"></td><td width=\"50\" align=\"center\" id=\"19-29\" class=\"r29 c19\"></td><td width=\"50\" align=\"center\" id=\"20-29\" class=\"r29 c20\"></td><td width=\"50\" align=\"center\" id=\"21-29\" class=\"r29 c21\"></td><td width=\"50\" align=\"center\" id=\"22-29\" class=\"r29 c22\"></td><td width=\"50\" align=\"center\" id=\"23-29\" class=\"r29 c23\"></td><td width=\"50\" align=\"center\" id=\"24-29\" class=\"r29 c24\"></td><td width=\"50\" align=\"center\" id=\"25-29\" class=\"r29 c25\"></td><td width=\"50\" align=\"center\" id=\"26-29\" class=\"r29 c26\"></td><td width=\"50\" align=\"center\" id=\"27-29\" class=\"r29 c27\"></td><td width=\"50\" align=\"center\" id=\"28-29\" class=\"r29 c28\"></td><td width=\"50\" align=\"center\" id=\"29-29\" class=\"r29 c29\"></td><td width=\"50\" align=\"center\" id=\"30-29\" class=\"r29 c30\"></td><td width=\"50\" align=\"center\" id=\"31-29\" class=\"r29 c31\"></td><td width=\"50\" align=\"center\" id=\"32-29\" class=\"r29 c32\"></td><td width=\"50\" align=\"center\" id=\"33-29\" class=\"r29 c33\"></td><td width=\"50\" align=\"center\" id=\"34-29\" class=\"r29 c34\"></td><td width=\"50\" align=\"center\" id=\"35-29\" class=\"r29 c35\"></td><td width=\"50\" align=\"center\" id=\"36-29\" class=\"r29 c36\"></td><td width=\"50\" align=\"center\" id=\"37-29\" class=\"r29 c37\"></td><td width=\"50\" align=\"center\" id=\"38-29\" class=\"r29 c38\"></td><td width=\"50\" align=\"center\" id=\"39-29\" class=\"r29 c39\"></td><td width=\"50\" align=\"center\" id=\"40-29\" class=\"r29 c40\"></td></tr><tr id=\"row-30\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">31</td><td width=\"50\" align=\"center\" id=\"0-30\" class=\"r30 c0\"></td><td width=\"50\" align=\"center\" id=\"1-30\" class=\"r30 c1\"></td><td width=\"50\" align=\"center\" id=\"2-30\" class=\"r30 c2\"></td><td width=\"50\" align=\"center\" id=\"3-30\" class=\"r30 c3\"></td><td width=\"50\" align=\"center\" id=\"4-30\" class=\"r30 c4\"></td><td width=\"50\" align=\"center\" id=\"5-30\" class=\"r30 c5\"></td><td width=\"50\" align=\"center\" id=\"6-30\" class=\"r30 c6\"></td><td width=\"50\" align=\"center\" id=\"7-30\" class=\"r30 c7\"></td><td width=\"50\" align=\"center\" id=\"8-30\" class=\"r30 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-30\" class=\"r30 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-30\" class=\"r30 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-30\" class=\"r30 c11\"></td><td width=\"50\" align=\"center\" id=\"12-30\" class=\"r30 c12\"></td><td width=\"50\" align=\"center\" id=\"13-30\" class=\"r30 c13\"></td><td width=\"50\" align=\"center\" id=\"14-30\" class=\"r30 c14\"></td><td width=\"50\" align=\"center\" id=\"15-30\" class=\"r30 c15\"></td><td width=\"50\" align=\"center\" id=\"16-30\" class=\"r30 c16\"></td><td width=\"50\" align=\"center\" id=\"17-30\" class=\"r30 c17\"></td><td width=\"50\" align=\"center\" id=\"18-30\" class=\"r30 c18\"></td><td width=\"50\" align=\"center\" id=\"19-30\" class=\"r30 c19\"></td><td width=\"50\" align=\"center\" id=\"20-30\" class=\"r30 c20\"></td><td width=\"50\" align=\"center\" id=\"21-30\" class=\"r30 c21\"></td><td width=\"50\" align=\"center\" id=\"22-30\" class=\"r30 c22\"></td><td width=\"50\" align=\"center\" id=\"23-30\" class=\"r30 c23\"></td><td width=\"50\" align=\"center\" id=\"24-30\" class=\"r30 c24\"></td><td width=\"50\" align=\"center\" id=\"25-30\" class=\"r30 c25\"></td><td width=\"50\" align=\"center\" id=\"26-30\" class=\"r30 c26\"></td><td width=\"50\" align=\"center\" id=\"27-30\" class=\"r30 c27\"></td><td width=\"50\" align=\"center\" id=\"28-30\" class=\"r30 c28\"></td><td width=\"50\" align=\"center\" id=\"29-30\" class=\"r30 c29\"></td><td width=\"50\" align=\"center\" id=\"30-30\" class=\"r30 c30\"></td><td width=\"50\" align=\"center\" id=\"31-30\" class=\"r30 c31\"></td><td width=\"50\" align=\"center\" id=\"32-30\" class=\"r30 c32\"></td><td width=\"50\" align=\"center\" id=\"33-30\" class=\"r30 c33\"></td><td width=\"50\" align=\"center\" id=\"34-30\" class=\"r30 c34\"></td><td width=\"50\" align=\"center\" id=\"35-30\" class=\"r30 c35\"></td><td width=\"50\" align=\"center\" id=\"36-30\" class=\"r30 c36\"></td><td width=\"50\" align=\"center\" id=\"37-30\" class=\"r30 c37\"></td><td width=\"50\" align=\"center\" id=\"38-30\" class=\"r30 c38\"></td><td width=\"50\" align=\"center\" id=\"39-30\" class=\"r30 c39\"></td><td width=\"50\" align=\"center\" id=\"40-30\" class=\"r30 c40\"></td></tr><tr id=\"row-31\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">32</td><td width=\"50\" align=\"center\" id=\"0-31\" class=\"r31 c0\"></td><td width=\"50\" align=\"center\" id=\"1-31\" class=\"r31 c1\"></td><td width=\"50\" align=\"center\" id=\"2-31\" class=\"r31 c2\"></td><td width=\"50\" align=\"center\" id=\"3-31\" class=\"r31 c3\"></td><td width=\"50\" align=\"center\" id=\"4-31\" class=\"r31 c4\"></td><td width=\"50\" align=\"center\" id=\"5-31\" class=\"r31 c5\"></td><td width=\"50\" align=\"center\" id=\"6-31\" class=\"r31 c6\"></td><td width=\"50\" align=\"center\" id=\"7-31\" class=\"r31 c7\"></td><td width=\"50\" align=\"center\" id=\"8-31\" class=\"r31 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-31\" class=\"r31 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-31\" class=\"r31 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-31\" class=\"r31 c11\"></td><td width=\"50\" align=\"center\" id=\"12-31\" class=\"r31 c12\"></td><td width=\"50\" align=\"center\" id=\"13-31\" class=\"r31 c13\"></td><td width=\"50\" align=\"center\" id=\"14-31\" class=\"r31 c14\"></td><td width=\"50\" align=\"center\" id=\"15-31\" class=\"r31 c15\"></td><td width=\"50\" align=\"center\" id=\"16-31\" class=\"r31 c16\"></td><td width=\"50\" align=\"center\" id=\"17-31\" class=\"r31 c17\"></td><td width=\"50\" align=\"center\" id=\"18-31\" class=\"r31 c18\"></td><td width=\"50\" align=\"center\" id=\"19-31\" class=\"r31 c19\"></td><td width=\"50\" align=\"center\" id=\"20-31\" class=\"r31 c20\"></td><td width=\"50\" align=\"center\" id=\"21-31\" class=\"r31 c21\"></td><td width=\"50\" align=\"center\" id=\"22-31\" class=\"r31 c22\"></td><td width=\"50\" align=\"center\" id=\"23-31\" class=\"r31 c23\"></td><td width=\"50\" align=\"center\" id=\"24-31\" class=\"r31 c24\"></td><td width=\"50\" align=\"center\" id=\"25-31\" class=\"r31 c25\"></td><td width=\"50\" align=\"center\" id=\"26-31\" class=\"r31 c26\"></td><td width=\"50\" align=\"center\" id=\"27-31\" class=\"r31 c27\"></td><td width=\"50\" align=\"center\" id=\"28-31\" class=\"r31 c28\"></td><td width=\"50\" align=\"center\" id=\"29-31\" class=\"r31 c29\"></td><td width=\"50\" align=\"center\" id=\"30-31\" class=\"r31 c30\"></td><td width=\"50\" align=\"center\" id=\"31-31\" class=\"r31 c31\"></td><td width=\"50\" align=\"center\" id=\"32-31\" class=\"r31 c32\"></td><td width=\"50\" align=\"center\" id=\"33-31\" class=\"r31 c33\"></td><td width=\"50\" align=\"center\" id=\"34-31\" class=\"r31 c34\"></td><td width=\"50\" align=\"center\" id=\"35-31\" class=\"r31 c35\"></td><td width=\"50\" align=\"center\" id=\"36-31\" class=\"r31 c36\"></td><td width=\"50\" align=\"center\" id=\"37-31\" class=\"r31 c37\"></td><td width=\"50\" align=\"center\" id=\"38-31\" class=\"r31 c38\"></td><td width=\"50\" align=\"center\" id=\"39-31\" class=\"r31 c39\"></td><td width=\"50\" align=\"center\" id=\"40-31\" class=\"r31 c40\"></td></tr><tr id=\"row-32\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">33</td><td width=\"50\" align=\"center\" id=\"0-32\" class=\"r32 c0\"></td><td width=\"50\" align=\"center\" id=\"1-32\" class=\"r32 c1\"></td><td width=\"50\" align=\"center\" id=\"2-32\" class=\"r32 c2\"></td><td width=\"50\" align=\"center\" id=\"3-32\" class=\"r32 c3\"></td><td width=\"50\" align=\"center\" id=\"4-32\" class=\"r32 c4\"></td><td width=\"50\" align=\"center\" id=\"5-32\" class=\"r32 c5\"></td><td width=\"50\" align=\"center\" id=\"6-32\" class=\"r32 c6\"></td><td width=\"50\" align=\"center\" id=\"7-32\" class=\"r32 c7\"></td><td width=\"50\" align=\"center\" id=\"8-32\" class=\"r32 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-32\" class=\"r32 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-32\" class=\"r32 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-32\" class=\"r32 c11\"></td><td width=\"50\" align=\"center\" id=\"12-32\" class=\"r32 c12\"></td><td width=\"50\" align=\"center\" id=\"13-32\" class=\"r32 c13\"></td><td width=\"50\" align=\"center\" id=\"14-32\" class=\"r32 c14\"></td><td width=\"50\" align=\"center\" id=\"15-32\" class=\"r32 c15\"></td><td width=\"50\" align=\"center\" id=\"16-32\" class=\"r32 c16\"></td><td width=\"50\" align=\"center\" id=\"17-32\" class=\"r32 c17\"></td><td width=\"50\" align=\"center\" id=\"18-32\" class=\"r32 c18\"></td><td width=\"50\" align=\"center\" id=\"19-32\" class=\"r32 c19\"></td><td width=\"50\" align=\"center\" id=\"20-32\" class=\"r32 c20\"></td><td width=\"50\" align=\"center\" id=\"21-32\" class=\"r32 c21\"></td><td width=\"50\" align=\"center\" id=\"22-32\" class=\"r32 c22\"></td><td width=\"50\" align=\"center\" id=\"23-32\" class=\"r32 c23\"></td><td width=\"50\" align=\"center\" id=\"24-32\" class=\"r32 c24\"></td><td width=\"50\" align=\"center\" id=\"25-32\" class=\"r32 c25\"></td><td width=\"50\" align=\"center\" id=\"26-32\" class=\"r32 c26\"></td><td width=\"50\" align=\"center\" id=\"27-32\" class=\"r32 c27\"></td><td width=\"50\" align=\"center\" id=\"28-32\" class=\"r32 c28\"></td><td width=\"50\" align=\"center\" id=\"29-32\" class=\"r32 c29\"></td><td width=\"50\" align=\"center\" id=\"30-32\" class=\"r32 c30\"></td><td width=\"50\" align=\"center\" id=\"31-32\" class=\"r32 c31\"></td><td width=\"50\" align=\"center\" id=\"32-32\" class=\"r32 c32\"></td><td width=\"50\" align=\"center\" id=\"33-32\" class=\"r32 c33\"></td><td width=\"50\" align=\"center\" id=\"34-32\" class=\"r32 c34\"></td><td width=\"50\" align=\"center\" id=\"35-32\" class=\"r32 c35\"></td><td width=\"50\" align=\"center\" id=\"36-32\" class=\"r32 c36\"></td><td width=\"50\" align=\"center\" id=\"37-32\" class=\"r32 c37\"></td><td width=\"50\" align=\"center\" id=\"38-32\" class=\"r32 c38\"></td><td width=\"50\" align=\"center\" id=\"39-32\" class=\"r32 c39\"></td><td width=\"50\" align=\"center\" id=\"40-32\" class=\"r32 c40\"></td></tr><tr id=\"row-33\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">34</td><td width=\"50\" align=\"center\" id=\"0-33\" class=\"r33 c0\"></td><td width=\"50\" align=\"center\" id=\"1-33\" class=\"r33 c1\"></td><td width=\"50\" align=\"center\" id=\"2-33\" class=\"r33 c2\"></td><td width=\"50\" align=\"center\" id=\"3-33\" class=\"r33 c3\"></td><td width=\"50\" align=\"center\" id=\"4-33\" class=\"r33 c4\"></td><td width=\"50\" align=\"center\" id=\"5-33\" class=\"r33 c5\"></td><td width=\"50\" align=\"center\" id=\"6-33\" class=\"r33 c6\"></td><td width=\"50\" align=\"center\" id=\"7-33\" class=\"r33 c7\"></td><td width=\"50\" align=\"center\" id=\"8-33\" class=\"r33 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-33\" class=\"r33 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-33\" class=\"r33 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-33\" class=\"r33 c11\"></td><td width=\"50\" align=\"center\" id=\"12-33\" class=\"r33 c12\"></td><td width=\"50\" align=\"center\" id=\"13-33\" class=\"r33 c13\"></td><td width=\"50\" align=\"center\" id=\"14-33\" class=\"r33 c14\"></td><td width=\"50\" align=\"center\" id=\"15-33\" class=\"r33 c15\"></td><td width=\"50\" align=\"center\" id=\"16-33\" class=\"r33 c16\"></td><td width=\"50\" align=\"center\" id=\"17-33\" class=\"r33 c17\"></td><td width=\"50\" align=\"center\" id=\"18-33\" class=\"r33 c18\"></td><td width=\"50\" align=\"center\" id=\"19-33\" class=\"r33 c19\"></td><td width=\"50\" align=\"center\" id=\"20-33\" class=\"r33 c20\"></td><td width=\"50\" align=\"center\" id=\"21-33\" class=\"r33 c21\"></td><td width=\"50\" align=\"center\" id=\"22-33\" class=\"r33 c22\"></td><td width=\"50\" align=\"center\" id=\"23-33\" class=\"r33 c23\"></td><td width=\"50\" align=\"center\" id=\"24-33\" class=\"r33 c24\"></td><td width=\"50\" align=\"center\" id=\"25-33\" class=\"r33 c25\"></td><td width=\"50\" align=\"center\" id=\"26-33\" class=\"r33 c26\"></td><td width=\"50\" align=\"center\" id=\"27-33\" class=\"r33 c27\"></td><td width=\"50\" align=\"center\" id=\"28-33\" class=\"r33 c28\"></td><td width=\"50\" align=\"center\" id=\"29-33\" class=\"r33 c29\"></td><td width=\"50\" align=\"center\" id=\"30-33\" class=\"r33 c30\"></td><td width=\"50\" align=\"center\" id=\"31-33\" class=\"r33 c31\"></td><td width=\"50\" align=\"center\" id=\"32-33\" class=\"r33 c32\"></td><td width=\"50\" align=\"center\" id=\"33-33\" class=\"r33 c33\"></td><td width=\"50\" align=\"center\" id=\"34-33\" class=\"r33 c34\"></td><td width=\"50\" align=\"center\" id=\"35-33\" class=\"r33 c35\"></td><td width=\"50\" align=\"center\" id=\"36-33\" class=\"r33 c36\"></td><td width=\"50\" align=\"center\" id=\"37-33\" class=\"r33 c37\"></td><td width=\"50\" align=\"center\" id=\"38-33\" class=\"r33 c38\"></td><td width=\"50\" align=\"center\" id=\"39-33\" class=\"r33 c39\"></td><td width=\"50\" align=\"center\" id=\"40-33\" class=\"r33 c40\"></td></tr><tr id=\"row-34\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">35</td><td width=\"50\" align=\"center\" id=\"0-34\" class=\"r34 c0\"></td><td width=\"50\" align=\"center\" id=\"1-34\" class=\"r34 c1\"></td><td width=\"50\" align=\"center\" id=\"2-34\" class=\"r34 c2\"></td><td width=\"50\" align=\"center\" id=\"3-34\" class=\"r34 c3\"></td><td width=\"50\" align=\"center\" id=\"4-34\" class=\"r34 c4\"></td><td width=\"50\" align=\"center\" id=\"5-34\" class=\"r34 c5\"></td><td width=\"50\" align=\"center\" id=\"6-34\" class=\"r34 c6\"></td><td width=\"50\" align=\"center\" id=\"7-34\" class=\"r34 c7\"></td><td width=\"50\" align=\"center\" id=\"8-34\" class=\"r34 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-34\" class=\"r34 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-34\" class=\"r34 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-34\" class=\"r34 c11\"></td><td width=\"50\" align=\"center\" id=\"12-34\" class=\"r34 c12\"></td><td width=\"50\" align=\"center\" id=\"13-34\" class=\"r34 c13\"></td><td width=\"50\" align=\"center\" id=\"14-34\" class=\"r34 c14\"></td><td width=\"50\" align=\"center\" id=\"15-34\" class=\"r34 c15\"></td><td width=\"50\" align=\"center\" id=\"16-34\" class=\"r34 c16\"></td><td width=\"50\" align=\"center\" id=\"17-34\" class=\"r34 c17\"></td><td width=\"50\" align=\"center\" id=\"18-34\" class=\"r34 c18\"></td><td width=\"50\" align=\"center\" id=\"19-34\" class=\"r34 c19\"></td><td width=\"50\" align=\"center\" id=\"20-34\" class=\"r34 c20\"></td><td width=\"50\" align=\"center\" id=\"21-34\" class=\"r34 c21\"></td><td width=\"50\" align=\"center\" id=\"22-34\" class=\"r34 c22\"></td><td width=\"50\" align=\"center\" id=\"23-34\" class=\"r34 c23\"></td><td width=\"50\" align=\"center\" id=\"24-34\" class=\"r34 c24\"></td><td width=\"50\" align=\"center\" id=\"25-34\" class=\"r34 c25\"></td><td width=\"50\" align=\"center\" id=\"26-34\" class=\"r34 c26\"></td><td width=\"50\" align=\"center\" id=\"27-34\" class=\"r34 c27\"></td><td width=\"50\" align=\"center\" id=\"28-34\" class=\"r34 c28\"></td><td width=\"50\" align=\"center\" id=\"29-34\" class=\"r34 c29\"></td><td width=\"50\" align=\"center\" id=\"30-34\" class=\"r34 c30\"></td><td width=\"50\" align=\"center\" id=\"31-34\" class=\"r34 c31\"></td><td width=\"50\" align=\"center\" id=\"32-34\" class=\"r34 c32\"></td><td width=\"50\" align=\"center\" id=\"33-34\" class=\"r34 c33\"></td><td width=\"50\" align=\"center\" id=\"34-34\" class=\"r34 c34\"></td><td width=\"50\" align=\"center\" id=\"35-34\" class=\"r34 c35\"></td><td width=\"50\" align=\"center\" id=\"36-34\" class=\"r34 c36\"></td><td width=\"50\" align=\"center\" id=\"37-34\" class=\"r34 c37\"></td><td width=\"50\" align=\"center\" id=\"38-34\" class=\"r34 c38\"></td><td width=\"50\" align=\"center\" id=\"39-34\" class=\"r34 c39\"></td><td width=\"50\" align=\"center\" id=\"40-34\" class=\"r34 c40\"></td></tr><tr id=\"row-35\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">36</td><td width=\"50\" align=\"center\" id=\"0-35\" class=\"r35 c0\"></td><td width=\"50\" align=\"center\" id=\"1-35\" class=\"r35 c1\"></td><td width=\"50\" align=\"center\" id=\"2-35\" class=\"r35 c2\"></td><td width=\"50\" align=\"center\" id=\"3-35\" class=\"r35 c3\"></td><td width=\"50\" align=\"center\" id=\"4-35\" class=\"r35 c4\"></td><td width=\"50\" align=\"center\" id=\"5-35\" class=\"r35 c5\"></td><td width=\"50\" align=\"center\" id=\"6-35\" class=\"r35 c6\"></td><td width=\"50\" align=\"center\" id=\"7-35\" class=\"r35 c7\"></td><td width=\"50\" align=\"center\" id=\"8-35\" class=\"r35 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-35\" class=\"r35 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-35\" class=\"r35 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-35\" class=\"r35 c11\"></td><td width=\"50\" align=\"center\" id=\"12-35\" class=\"r35 c12\"></td><td width=\"50\" align=\"center\" id=\"13-35\" class=\"r35 c13\"></td><td width=\"50\" align=\"center\" id=\"14-35\" class=\"r35 c14\"></td><td width=\"50\" align=\"center\" id=\"15-35\" class=\"r35 c15\"></td><td width=\"50\" align=\"center\" id=\"16-35\" class=\"r35 c16\"></td><td width=\"50\" align=\"center\" id=\"17-35\" class=\"r35 c17\"></td><td width=\"50\" align=\"center\" id=\"18-35\" class=\"r35 c18\"></td><td width=\"50\" align=\"center\" id=\"19-35\" class=\"r35 c19\"></td><td width=\"50\" align=\"center\" id=\"20-35\" class=\"r35 c20\"></td><td width=\"50\" align=\"center\" id=\"21-35\" class=\"r35 c21\"></td><td width=\"50\" align=\"center\" id=\"22-35\" class=\"r35 c22\"></td><td width=\"50\" align=\"center\" id=\"23-35\" class=\"r35 c23\"></td><td width=\"50\" align=\"center\" id=\"24-35\" class=\"r35 c24\"></td><td width=\"50\" align=\"center\" id=\"25-35\" class=\"r35 c25\"></td><td width=\"50\" align=\"center\" id=\"26-35\" class=\"r35 c26\"></td><td width=\"50\" align=\"center\" id=\"27-35\" class=\"r35 c27\"></td><td width=\"50\" align=\"center\" id=\"28-35\" class=\"r35 c28\"></td><td width=\"50\" align=\"center\" id=\"29-35\" class=\"r35 c29\"></td><td width=\"50\" align=\"center\" id=\"30-35\" class=\"r35 c30\"></td><td width=\"50\" align=\"center\" id=\"31-35\" class=\"r35 c31\"></td><td width=\"50\" align=\"center\" id=\"32-35\" class=\"r35 c32\"></td><td width=\"50\" align=\"center\" id=\"33-35\" class=\"r35 c33\"></td><td width=\"50\" align=\"center\" id=\"34-35\" class=\"r35 c34\"></td><td width=\"50\" align=\"center\" id=\"35-35\" class=\"r35 c35\"></td><td width=\"50\" align=\"center\" id=\"36-35\" class=\"r35 c36\"></td><td width=\"50\" align=\"center\" id=\"37-35\" class=\"r35 c37\"></td><td width=\"50\" align=\"center\" id=\"38-35\" class=\"r35 c38\"></td><td width=\"50\" align=\"center\" id=\"39-35\" class=\"r35 c39\"></td><td width=\"50\" align=\"center\" id=\"40-35\" class=\"r35 c40\"></td></tr><tr id=\"row-36\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">37</td><td width=\"50\" align=\"center\" id=\"0-36\" class=\"r36 c0\"></td><td width=\"50\" align=\"center\" id=\"1-36\" class=\"r36 c1\"></td><td width=\"50\" align=\"center\" id=\"2-36\" class=\"r36 c2\"></td><td width=\"50\" align=\"center\" id=\"3-36\" class=\"r36 c3\"></td><td width=\"50\" align=\"center\" id=\"4-36\" class=\"r36 c4\"></td><td width=\"50\" align=\"center\" id=\"5-36\" class=\"r36 c5\"></td><td width=\"50\" align=\"center\" id=\"6-36\" class=\"r36 c6\"></td><td width=\"50\" align=\"center\" id=\"7-36\" class=\"r36 c7\"></td><td width=\"50\" align=\"center\" id=\"8-36\" class=\"r36 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-36\" class=\"r36 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-36\" class=\"r36 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-36\" class=\"r36 c11\"></td><td width=\"50\" align=\"center\" id=\"12-36\" class=\"r36 c12\"></td><td width=\"50\" align=\"center\" id=\"13-36\" class=\"r36 c13\"></td><td width=\"50\" align=\"center\" id=\"14-36\" class=\"r36 c14\"></td><td width=\"50\" align=\"center\" id=\"15-36\" class=\"r36 c15\"></td><td width=\"50\" align=\"center\" id=\"16-36\" class=\"r36 c16\"></td><td width=\"50\" align=\"center\" id=\"17-36\" class=\"r36 c17\"></td><td width=\"50\" align=\"center\" id=\"18-36\" class=\"r36 c18\"></td><td width=\"50\" align=\"center\" id=\"19-36\" class=\"r36 c19\"></td><td width=\"50\" align=\"center\" id=\"20-36\" class=\"r36 c20\"></td><td width=\"50\" align=\"center\" id=\"21-36\" class=\"r36 c21\"></td><td width=\"50\" align=\"center\" id=\"22-36\" class=\"r36 c22\"></td><td width=\"50\" align=\"center\" id=\"23-36\" class=\"r36 c23\"></td><td width=\"50\" align=\"center\" id=\"24-36\" class=\"r36 c24\"></td><td width=\"50\" align=\"center\" id=\"25-36\" class=\"r36 c25\"></td><td width=\"50\" align=\"center\" id=\"26-36\" class=\"r36 c26\"></td><td width=\"50\" align=\"center\" id=\"27-36\" class=\"r36 c27\"></td><td width=\"50\" align=\"center\" id=\"28-36\" class=\"r36 c28\"></td><td width=\"50\" align=\"center\" id=\"29-36\" class=\"r36 c29\"></td><td width=\"50\" align=\"center\" id=\"30-36\" class=\"r36 c30\"></td><td width=\"50\" align=\"center\" id=\"31-36\" class=\"r36 c31\"></td><td width=\"50\" align=\"center\" id=\"32-36\" class=\"r36 c32\"></td><td width=\"50\" align=\"center\" id=\"33-36\" class=\"r36 c33\"></td><td width=\"50\" align=\"center\" id=\"34-36\" class=\"r36 c34\"></td><td width=\"50\" align=\"center\" id=\"35-36\" class=\"r36 c35\"></td><td width=\"50\" align=\"center\" id=\"36-36\" class=\"r36 c36\"></td><td width=\"50\" align=\"center\" id=\"37-36\" class=\"r36 c37\"></td><td width=\"50\" align=\"center\" id=\"38-36\" class=\"r36 c38\"></td><td width=\"50\" align=\"center\" id=\"39-36\" class=\"r36 c39\"></td><td width=\"50\" align=\"center\" id=\"40-36\" class=\"r36 c40\"></td></tr><tr id=\"row-37\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">38</td><td width=\"50\" align=\"center\" id=\"0-37\" class=\"r37 c0\"></td><td width=\"50\" align=\"center\" id=\"1-37\" class=\"r37 c1\"></td><td width=\"50\" align=\"center\" id=\"2-37\" class=\"r37 c2\"></td><td width=\"50\" align=\"center\" id=\"3-37\" class=\"r37 c3\"></td><td width=\"50\" align=\"center\" id=\"4-37\" class=\"r37 c4\"></td><td width=\"50\" align=\"center\" id=\"5-37\" class=\"r37 c5\"></td><td width=\"50\" align=\"center\" id=\"6-37\" class=\"r37 c6\"></td><td width=\"50\" align=\"center\" id=\"7-37\" class=\"r37 c7\"></td><td width=\"50\" align=\"center\" id=\"8-37\" class=\"r37 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-37\" class=\"r37 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-37\" class=\"r37 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-37\" class=\"r37 c11\"></td><td width=\"50\" align=\"center\" id=\"12-37\" class=\"r37 c12\"></td><td width=\"50\" align=\"center\" id=\"13-37\" class=\"r37 c13\"></td><td width=\"50\" align=\"center\" id=\"14-37\" class=\"r37 c14\"></td><td width=\"50\" align=\"center\" id=\"15-37\" class=\"r37 c15\"></td><td width=\"50\" align=\"center\" id=\"16-37\" class=\"r37 c16\"></td><td width=\"50\" align=\"center\" id=\"17-37\" class=\"r37 c17\"></td><td width=\"50\" align=\"center\" id=\"18-37\" class=\"r37 c18\"></td><td width=\"50\" align=\"center\" id=\"19-37\" class=\"r37 c19\"></td><td width=\"50\" align=\"center\" id=\"20-37\" class=\"r37 c20\"></td><td width=\"50\" align=\"center\" id=\"21-37\" class=\"r37 c21\"></td><td width=\"50\" align=\"center\" id=\"22-37\" class=\"r37 c22\"></td><td width=\"50\" align=\"center\" id=\"23-37\" class=\"r37 c23\"></td><td width=\"50\" align=\"center\" id=\"24-37\" class=\"r37 c24\"></td><td width=\"50\" align=\"center\" id=\"25-37\" class=\"r37 c25\"></td><td width=\"50\" align=\"center\" id=\"26-37\" class=\"r37 c26\"></td><td width=\"50\" align=\"center\" id=\"27-37\" class=\"r37 c27\"></td><td width=\"50\" align=\"center\" id=\"28-37\" class=\"r37 c28\"></td><td width=\"50\" align=\"center\" id=\"29-37\" class=\"r37 c29\"></td><td width=\"50\" align=\"center\" id=\"30-37\" class=\"r37 c30\"></td><td width=\"50\" align=\"center\" id=\"31-37\" class=\"r37 c31\"></td><td width=\"50\" align=\"center\" id=\"32-37\" class=\"r37 c32\"></td><td width=\"50\" align=\"center\" id=\"33-37\" class=\"r37 c33\"></td><td width=\"50\" align=\"center\" id=\"34-37\" class=\"r37 c34\"></td><td width=\"50\" align=\"center\" id=\"35-37\" class=\"r37 c35\"></td><td width=\"50\" align=\"center\" id=\"36-37\" class=\"r37 c36\"></td><td width=\"50\" align=\"center\" id=\"37-37\" class=\"r37 c37\"></td><td width=\"50\" align=\"center\" id=\"38-37\" class=\"r37 c38\"></td><td width=\"50\" align=\"center\" id=\"39-37\" class=\"r37 c39\"></td><td width=\"50\" align=\"center\" id=\"40-37\" class=\"r37 c40\"></td></tr><tr id=\"row-38\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">39</td><td width=\"50\" align=\"center\" id=\"0-38\" class=\"r38 c0\"></td><td width=\"50\" align=\"center\" id=\"1-38\" class=\"r38 c1\"></td><td width=\"50\" align=\"center\" id=\"2-38\" class=\"r38 c2\"></td><td width=\"50\" align=\"center\" id=\"3-38\" class=\"r38 c3\"></td><td width=\"50\" align=\"center\" id=\"4-38\" class=\"r38 c4\"></td><td width=\"50\" align=\"center\" id=\"5-38\" class=\"r38 c5\"></td><td width=\"50\" align=\"center\" id=\"6-38\" class=\"r38 c6\"></td><td width=\"50\" align=\"center\" id=\"7-38\" class=\"r38 c7\"></td><td width=\"50\" align=\"center\" id=\"8-38\" class=\"r38 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-38\" class=\"r38 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-38\" class=\"r38 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-38\" class=\"r38 c11\"></td><td width=\"50\" align=\"center\" id=\"12-38\" class=\"r38 c12\"></td><td width=\"50\" align=\"center\" id=\"13-38\" class=\"r38 c13\"></td><td width=\"50\" align=\"center\" id=\"14-38\" class=\"r38 c14\"></td><td width=\"50\" align=\"center\" id=\"15-38\" class=\"r38 c15\"></td><td width=\"50\" align=\"center\" id=\"16-38\" class=\"r38 c16\"></td><td width=\"50\" align=\"center\" id=\"17-38\" class=\"r38 c17\"></td><td width=\"50\" align=\"center\" id=\"18-38\" class=\"r38 c18\"></td><td width=\"50\" align=\"center\" id=\"19-38\" class=\"r38 c19\"></td><td width=\"50\" align=\"center\" id=\"20-38\" class=\"r38 c20\"></td><td width=\"50\" align=\"center\" id=\"21-38\" class=\"r38 c21\"></td><td width=\"50\" align=\"center\" id=\"22-38\" class=\"r38 c22\"></td><td width=\"50\" align=\"center\" id=\"23-38\" class=\"r38 c23\"></td><td width=\"50\" align=\"center\" id=\"24-38\" class=\"r38 c24\"></td><td width=\"50\" align=\"center\" id=\"25-38\" class=\"r38 c25\"></td><td width=\"50\" align=\"center\" id=\"26-38\" class=\"r38 c26\"></td><td width=\"50\" align=\"center\" id=\"27-38\" class=\"r38 c27\"></td><td width=\"50\" align=\"center\" id=\"28-38\" class=\"r38 c28\"></td><td width=\"50\" align=\"center\" id=\"29-38\" class=\"r38 c29\"></td><td width=\"50\" align=\"center\" id=\"30-38\" class=\"r38 c30\"></td><td width=\"50\" align=\"center\" id=\"31-38\" class=\"r38 c31\"></td><td width=\"50\" align=\"center\" id=\"32-38\" class=\"r38 c32\"></td><td width=\"50\" align=\"center\" id=\"33-38\" class=\"r38 c33\"></td><td width=\"50\" align=\"center\" id=\"34-38\" class=\"r38 c34\"></td><td width=\"50\" align=\"center\" id=\"35-38\" class=\"r38 c35\"></td><td width=\"50\" align=\"center\" id=\"36-38\" class=\"r38 c36\"></td><td width=\"50\" align=\"center\" id=\"37-38\" class=\"r38 c37\"></td><td width=\"50\" align=\"center\" id=\"38-38\" class=\"r38 c38\"></td><td width=\"50\" align=\"center\" id=\"39-38\" class=\"r38 c39\"></td><td width=\"50\" align=\"center\" id=\"40-38\" class=\"r38 c40\"></td></tr><tr id=\"row-39\" class=\"\"><td class=\"jexcel_label\" style=\"left: 0px;\">40</td><td width=\"50\" align=\"center\" id=\"0-39\" class=\"r39 c0\"></td><td width=\"50\" align=\"center\" id=\"1-39\" class=\"r39 c1\"></td><td width=\"50\" align=\"center\" id=\"2-39\" class=\"r39 c2\"></td><td width=\"50\" align=\"center\" id=\"3-39\" class=\"r39 c3\"></td><td width=\"50\" align=\"center\" id=\"4-39\" class=\"r39 c4\"></td><td width=\"50\" align=\"center\" id=\"5-39\" class=\"r39 c5\"></td><td width=\"50\" align=\"center\" id=\"6-39\" class=\"r39 c6\"></td><td width=\"50\" align=\"center\" id=\"7-39\" class=\"r39 c7\"></td><td width=\"50\" align=\"center\" id=\"8-39\" class=\"r39 c8\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"9-39\" class=\"r39 c9\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"10-39\" class=\"r39 c10\" style=\"\" b=\"\" wai=\"\"></td><td width=\"50\" align=\"center\" id=\"11-39\" class=\"r39 c11\"></td><td width=\"50\" align=\"center\" id=\"12-39\" class=\"r39 c12\"></td><td width=\"50\" align=\"center\" id=\"13-39\" class=\"r39 c13\"></td><td width=\"50\" align=\"center\" id=\"14-39\" class=\"r39 c14\"></td><td width=\"50\" align=\"center\" id=\"15-39\" class=\"r39 c15\"></td><td width=\"50\" align=\"center\" id=\"16-39\" class=\"r39 c16\"></td><td width=\"50\" align=\"center\" id=\"17-39\" class=\"r39 c17\"></td><td width=\"50\" align=\"center\" id=\"18-39\" class=\"r39 c18\"></td><td width=\"50\" align=\"center\" id=\"19-39\" class=\"r39 c19\"></td><td width=\"50\" align=\"center\" id=\"20-39\" class=\"r39 c20\"></td><td width=\"50\" align=\"center\" id=\"21-39\" class=\"r39 c21\"></td><td width=\"50\" align=\"center\" id=\"22-39\" class=\"r39 c22\"></td><td width=\"50\" align=\"center\" id=\"23-39\" class=\"r39 c23\"></td><td width=\"50\" align=\"center\" id=\"24-39\" class=\"r39 c24\"></td><td width=\"50\" align=\"center\" id=\"25-39\" class=\"r39 c25\"></td><td width=\"50\" align=\"center\" id=\"26-39\" class=\"r39 c26\"></td><td width=\"50\" align=\"center\" id=\"27-39\" class=\"r39 c27\"></td><td width=\"50\" align=\"center\" id=\"28-39\" class=\"r39 c28\"></td><td width=\"50\" align=\"center\" id=\"29-39\" class=\"r39 c29\"></td><td width=\"50\" align=\"center\" id=\"30-39\" class=\"r39 c30\"></td><td width=\"50\" align=\"center\" id=\"31-39\" class=\"r39 c31\"></td><td width=\"50\" align=\"center\" id=\"32-39\" class=\"r39 c32\"></td><td width=\"50\" align=\"center\" id=\"33-39\" class=\"r39 c33\"></td><td width=\"50\" align=\"center\" id=\"34-39\" class=\"r39 c34\"></td><td width=\"50\" align=\"center\" id=\"35-39\" class=\"r39 c35\"></td><td width=\"50\" align=\"center\" id=\"36-39\" class=\"r39 c36\"></td><td width=\"50\" align=\"center\" id=\"37-39\" class=\"r39 c37\"></td><td width=\"50\" align=\"center\" id=\"38-39\" class=\"r39 c38\"></td><td width=\"50\" align=\"center\" id=\"39-39\" class=\"r39 c39\"></td><td width=\"50\" align=\"center\" id=\"40-39\" class=\"r39 c40\"></td></tr></tbody></table></div>", "top": "753.452083333337", "left": "395.212499999998", "paraname": "ParameterReport61", "zzzzheight": "407", "zzzzwidth": "1027" }

var c = [{ "id": null, "value": "1", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "2021-09-30 00:00:00", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "2", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "2021-09-30 01:00:00", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "3", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "2021-09-30 02:00:00", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "4", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "2021-09-30 03:00:00", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "5", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "2021-09-30 04:00:00", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "6", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": "2021-09-30 05:00:00", "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }, { "id": null, "value": null, "modify": null, "modifyname": null, "modifytime": null }]
// initMainChart(d, null);
// initMainChart(d, c);
// initMainChart(d1, []);
// initMainChart(d, c);
// initMainChart(d, c1);
// initItem("ParameterReport11", [{"name":"查询时间","value":"2021-02-06 18:00","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM-dd HH:mm"},{"name":"查询时间","value":"2021-02-06","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM-dd"},{"name":"查询时间","value":"2021","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy"},{"name":"查询时间","value":"2021-02-06 18:00:33","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM-dd HH:mm:ss"},{"name":"查询时间","value":"2021-02-06 18:00","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM-dd HH:mm"},{"name":"查询时间","value":"2021-02-06 18","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM-dd HH"},{"name":"查询时间","value":"2021-02-06","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM-dd"},{"name":"查询时间","value":"2021-02","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM"},{"name":"查询时间","value":"2021","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy"},{"name":"查询账号","value":"guest","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":null},{"name":"查询时间","value":"2021-02-06 18:00:33","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM-dd HH:mm:ss"},{"name":"查询时间","value":"2021-02-06 18:00","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM-dd HH:mm"},{"name":"查询时间","value":"2021-02-06 18","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM-dd HH"},{"name":"查询时间","value":"2021-02-06","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM-dd"},{"name":"查询时间","value":"2021-02","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy-MM"},{"name":"查询时间","value":"2021","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy"},{"name":"查询时间","value":"2021","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy"},{"name":"查询账号","value":"guest","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":null},{"name":"查询时间","value":"2021","sumtype":null,"statisticstype":null,"statisticsbanci":null,"sourcetype":null,"sourceid":null,"format":"yyyy"}])
// OutputButton22
// QueryButton30
var s11;
var checked;
var data;
var sss1;
var exporttitle = ''
var exportword = ''
var customMultiLanguage;

function dateFormat(fmt, date) {
	let ret;
	const opt = {
		"y+": date.getFullYear().toString(), // 年
		"M+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"m+": date.getMinutes().toString(), // 分
		"s+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}
function group(array, subGroupLength) {
	let index = 0;
	let newArray = [];
	while (index < array.length) {
		newArray.push(array.slice(index, index += subGroupLength));
	}
	return newArray;
}
function replaceZhtml(str, name) {
		let _obj = customMultiLanguage.find(_ => _.Field == name && _.Origin == str)
		if (_obj) {
			return _obj.MultiLanguage || str;
		}
		return str;
}
function zhtmlFn(_str, name) {
	let str = _str.split('').reverse().join('')
	let _x = str.replace(/\/<(.*?)>/g, function (item) {
		let _ = item.replace("/<", "").replace(">", "")
 		if (_) {
			_ = replaceZhtml(_.split('').reverse().join(''), name)
		}
 		return `/<${_.split('').reverse().join('')}>`
	})
	let fin = _x.split('').reverse().join('')
 	return fin
}
function initMainChart(para1, para2) {
	jsObj.getCustomLanguages().then(res => {
		customMultiLanguage=res;

	
	jsObj.getLanguageText('ReportForm_ExportProgress').then((res) => {
		exporttitle = res
	})
	jsObj.getLanguageText('ReportForm_Exporting').then((res) => {
		exportword = res
	})
	jsObj.getLanguageText('HT_MessageBoxCaption_Tips').then((res) => {
		$('.w')[0].innerHTML = res
	})
	jsObj.getLanguageText('ReportForm_ExportDataUpTo10000').then((res) => {
		$('.tipword')[0].innerHTML = res
	})
	jsObj.getLanguageText('HT_MessageBoxCaption_Tips').then((res) => {
		$('.tipyes')[0].innerHTML = res
	})
	jsObj.getLanguageText('ReportForm_Loading').then((res) => {
		$('.jiazai')[0].innerHTML = res
	})
	console.log("html", para1)
	console.log("数据", para2)

	checked = 1;


	if (typeof (para1) == 'string') {
		sss = para1;
		headdata = JSON.parse(para1);
	} else {
		headdata = para1;
		sss = para1;
	}
	firsttable = 1;
	if (!headdata.kzsummotype) {
		headdata.kzsummopos = "无"
	}
	var divbox = headdata.zhtml.replace(/[\\]/g, '');
 	divbox = zhtmlFn(divbox ,headdata.paraname)
	console.log('divbox',divbox)
	var divone = document.createElement('div');
	divone.id = headdata.paraname;
	if (para2 == '[]' || !para2) {
		para2 = [];
	}

	$("#" + headdata.paraname).remove();
	$(divone).append(divbox);
	$('body').append(divone);

	var delnum = 0
	// 删除多余数据项
	var endx = $($("#" + headdata.paraname).find('tr')[0]).find('td').length - 1;

	var endy = $("#" + headdata.paraname).find('tr').length - 1;

	for (let i = 0; i < headdata.cellparaarray.length; i++) {
		var c = headdata.cellparaarray[i].id.split('-');
		if (c[0] > endx || c[1] > endy) {
			headdata.cellparaarray.splice(i, 1)
		}
	}
	for (let i = 0; i < headdata.kzresourcedataitemarray.length; i++) {
		var c = headdata.kzresourcedataitemarray[i].id.split('-');
		if (c[0] >= endx || c[1] >= endy) {
			delnum++
			// headdata.cellparaarray.splice(i,1)
		}
	}
	var delnum1 = headdata.kzresourcedataitemarray.length - delnum
	console.log("para2", para2)
	if (Array.isArray(para2)) {

		let daiarr = group(para2, headdata.kzresourcedataitemarray.length)

		for (let i = 0; i < daiarr.length; i++) {
			if (daiarr[i].length > delnum1) {
				daiarr[i].splice(delnum1, (daiarr[i].length - delnum1))
			}
		}
		// para2 = [].concat.apply([], daiarr);
		console.log("sssssssssssssssssssss")
		data1 = para2;
		let a = JSON.stringify(para2);
		hhh = JSON.parse(a);

	} else {
		console.log("sssssssssssssssssssss1")
		data1 = JSON.parse(para2);
		let daiarr = group(data1, headdata.kzresourcedataitemarray.length)
		for (let i = 0; i < daiarr.length; i++) {
			if (daiarr[i].length > delnum1) {
				daiarr[i].splice(delnum1, (daiarr[i].length - delnum1))
			}
		}
		// data1 = [].concat.apply([], daiarr);

		let b = JSON.stringify(data1);
		hhh = JSON.parse(b)
	}
	console.log("para2", JSON.stringify(hhh))
	headdata.tabledata = hhh;


	headdata.kzresourcedataitemarray1 = JSON.parse(JSON.stringify(headdata.kzresourcedataitemarray))

	var bwidth = 0;
	var bheigth = 0;
	for (let w = 0; w < $($("#" + headdata.paraname).find('#row-0')[0]).find('td').length; w++) {
		bwidth = bwidth + $($("#" + headdata.paraname).find('#row-0')[0]).find('td')[w].clientWidth;
	}
	$("#" + headdata.paraname)[0].style.width = bwidth + 'px';
	for (let w = 0; w < $("#" + headdata.paraname).find('tr').length; w++) {
		bheigth = bheigth + $("#" + headdata.paraname).find('tr')[w].clientHeight;
	}
	bheigth += 32
	$("#" + headdata.paraname)[0].style.height = bheigth + 'px';
	let ndata = [];
	for (let i3 = 0; i3 < headdata.kzresourcedataitemarray.length; i3++) {
		if (headdata.kzresourcedataitemarray[i3].itemdata !== null) {
			ndata.push(headdata.kzresourcedataitemarray[i3])
		}
	}
	headdata.kzresourcedataitemarray = ndata;

	var s = JSON.stringify(hhh);
	var s1 = JSON.parse(s);
	// 改权限
	let dataarry = [];

	for (let iid = 0; iid < $('#' + headdata.paraname).find(".datareadyhead").length; iid++) {
		for (let iid2 = 0; iid2 < headdata.kzresourcedataitemarray.length; iid2++) {
			console.log($('#' + headdata.paraname).find(".datareadyhead")[iid].id)
			if ($('#' + headdata.paraname).find(".datareadyhead")[iid].id == headdata.kzresourcedataitemarray[iid2].id) {

				dataarry.push(headdata.kzresourcedataitemarray[iid2])
			}
		}

	}

	// headdata.kzresourcedataitemarray = dataarry;

	if (para2.length !== 0) {
		let a =
			`<div class="page2" style="position:absolute" id="` + headdata.paraname +
			`page">
		    <div class="page1" id="id">
			<div class="start">1</div>
			     <div class="next"><img src="src/img/552cc14536532.png" ></div>
				 <div class="jump">
					 <input type="text" class="numinp">
				 </div>
				 <div class="last"><img src="src/img/right_.png" ></div>
				 <div class="end"></div>
				</div>
				</div>`
		$("body").append(a)
	}

	if (headdata.kzdirection == "纵向扩展") {


		if (headdata.kzsummopos == '分布在后') {
			if (headdata.kzsummotype) {
				var sumdata = headdata.kzsummotype.split(",");
				headdata.endpoy = parseInt(headdata.endpoy) - sumdata.length;
			}
		} else {
			if (headdata.kzsummotype) {
				var sumdata = headdata.kzsummotype.split(",");
				headdata.endpoy = parseInt(headdata.endpoy) - sumdata.length;
			}
		}
		var s111 = parseInt(headdata.endpox) - parseInt(headdata.startpox) + 1;
		if (s111 > $("#" + headdata.paraname).find('.datareadyhead').length) {
			s111 = $("#" + headdata.paraname).find('.datareadyhead').length
		}
		var s101 = parseInt(headdata.endpoy) - parseInt(headdata.startpoy);
		if (headdata.kzsummopos == '') {
			if (s101 > $("#" + headdata.paraname).find('tr').length - parseInt(headdata.startpoy) - 1) {
				s101 = $("#" + headdata.paraname).find('tr').length - parseInt(headdata.startpoy) - 1
			}
		} else if (headdata.kzsummopos == '分布在前') {
			if (s101 > $("#" + headdata.paraname).find('tr').length - parseInt(headdata.startpoy) - 1 - sumdata.length) {
				s101 = $("#" + headdata.paraname).find('tr').length - parseInt(headdata.startpoy) - 1 - sumdata.length
			}
		} else if (headdata.kzsummopos == '分布在后') {
			var xnum = 0;
			for (let i2 = 0; i2 < $("#" + headdata.paraname).find('tr').length; i2++) {
				for (let i3 = 0; i3 < $($("#" + headdata.paraname).find('tr')[i2]).find('td').length; i3++) {
					if ($($($("#" + headdata.paraname).find('tr')[i2]).find('td')[i3]).hasClass('dataready')) {
						xnum = xnum + 1;
						break
					}
				}
			}
		}
		var shi1 = [];

		if (headdata.kzresourcedataitemarray !== '') {
			for (let ii = 0; ii < headdata.kzresourcedataitemarray.length; ii++) {
				var shi2 = headdata.kzresourcedataitemarray[ii].id.split('-');
				shi1.push(parseInt(shi2[0]) - parseInt(headdata.startpox))
			}
		}
		if (shi1.length > $("#" + headdata.paraname).find('.datareadyhead').length) {
			shi1.length = $("#" + headdata.paraname).find('.datareadyhead').length
		}

		s6 = s101 * shi1.length;
		headdata.nowend = s6;
		data = s1.splice(0, s6)
	} else {
		if (headdata.kzsummotype) {
			var sumdata = headdata.kzsummotype.split(",");
			var s111 = parseInt(headdata.endpox) - parseInt(headdata.startpox) - sumdata.length;
		} else {
			var s111 = parseInt(headdata.endpox) - parseInt(headdata.startpox);
		}
		var shi1 = [];

		if (headdata.kzresourcedataitemarray !== []) {
			for (let ii = 0; ii < headdata.kzresourcedataitemarray.length; ii++) {
				var shi2 = headdata.kzresourcedataitemarray[ii].id.split('-');
				shi1.push(parseInt(shi2[1]))
			}
		}
		var s101 = parseInt(headdata.endpoy) - parseInt(headdata.startpoy) + 1;
		if (shi1.length !== []) {
			s101 = s101 - shi1.length;
		}
		if (headdata.kzsummopos == '无') {
			var xnum = 0;

			for (let i3 = 0; i3 < $($("#" + headdata.paraname).find('tr')[parseInt(headdata.startpoy)]).find('td').length; i3++) {
				if ($($($("#" + headdata.paraname).find('tr')[parseInt(headdata.startpoy)]).find('td')[i3]).hasClass('dataready')) {
					xnum = xnum + 1;

				}
			}
			s111 = xnum;
		}
		console.log("s111", s111)
		console.log("s1", shi1)
		s6 = s111 * shi1.length;
		headdata.nowend = s6;
		data = s1.splice(0, s6)
	}

	redhead = parseInt(headdata.startpox);
	if (data1.length <= s6) {
		datanum = data1.length;
	} else {
		datanum = s6;
	}
	daochuend = Math.ceil(data1.length / s6);

	headdata.daochuend = daochuend;

	headdata.nowdata = data;
 	// for (let ai = 0; ai <= (headdata.tabledata.length % headdata.nowdata.length); ai++) {
	// 	headdata.tabledata.push({
	// 		"value": null,
	// 		"modify": null,
	// 		"modifyname": null,
	// 		"modifytime": null
	// 	})
	// }
	if (savetable.length == 0) {
		savetable.push(headdata)
	} else {
		let pd = false;
		for (let i = 0; i < savetable.length; i++) {

			if (savetable[i].paraname !== headdata.paraname) {
				pd = true;
			}

		}
		if (pd) {
			savetable.push(headdata)
		}
		pd = false;
	}
	if (data1.length == 0) {
		// $("#" + headdata.paraname + "page").find('.end')[0].innerHTML = 0;
	} else {

		$("#" + headdata.paraname + "page").find('.end')[0].innerHTML = Math.ceil(data1.length / s6);
		$("#" + headdata.paraname + "page").find('.numinp')[0].value = 1;
	}




	$("#" + headdata.paraname)[0].style.position = 'absolute';
	$("#" + headdata.paraname)[0].style.top = headdata.top + 'px';
	$("#" + headdata.paraname)[0].style.left = headdata.left + "px";
	$("#" + headdata.paraname)[0].style.height = headdata.zzzzheight + 'px';
	$("#" + headdata.paraname)[0].style.width = headdata.zzzzwidth + "px";
	for (let i = 0; i < savetable.length; i++) {
		if (savetable[i].paraname == headdata.paraname) {
			pd = true;
		}
		if (pd) {
			if ($("#" + headdata.paraname + "page")[0]) {
				savetable[i].page = $("#" + headdata.paraname + "page")[0].cloneNode(true);
			}

		}
		pd = false;
	}
	$("#" + headdata.paraname + "page").remove();
	// let sc = 0
	// for(let i1 =0;i1<$("#" + headdata.paraname).find('td').length;i1++){
	// 	console.log($($("#" + headdata.paraname).find('td')[i1]).attr('showtd'))
	// 	if($($("#" + headdata.paraname).find('td')[i1]).attr('showtd')){
	// 		$($("#" + headdata.paraname).find('td')[i1]).css({
	// 			'display':'none'
	// 		})
	// 		$($("#" + headdata.paraname).find('td')[i1])
	// 		// sc++
	// 	}
	// }
	// for(let i1 =0;i1<sc;i1++){
	// 	$($("#" + headdata.paraname).find('.removeshowt')[i1]).remove()
	// }
	setbodydata(1);
	})
}
//替换table数据和worksheet名字
var format = function (s, c) {
	return s.replace(/{(\w+)}/g,
		function (m, p) {
			return c[p];
		});
}

// function getPointNum(num, n) {
// 	if (num == null) {
// 		let str = null;
// 		return str;
// 	} else {
// 		let str = String(num);
// 		if (str.indexOf(".") > -1) {
// 			let index = str.indexOf(".");
// 			let str1 = str.substring(0, index + n + 1);
// 			str1 = Number(str1);
// 			return str1;
// 		} else {
// 			return str
// 		}

// 	}

// }
function getPointNum(num, n) {
	if (num == null || num == undefined || num === '') {
		let str = null;
		return str;
	} else {
		let str = Number(num);
		if (isNaN(str) && n == 0) {
			return num
		} else {
			return str.toFixed(n)
		}



		// if (str.indexOf('.') > -1) {
		//     let index = str.indexOf('.');
		//     let str1 = str.substring(0, index + n + 1);
		//     str1 = Number(str1);
		//     return str1;
		// } else {
		//     return str;
		// }
	}

}

//初始化表格实现
function setbodydata(a) {
	// alert("222")
	console.log(savetable)
	var pddaochu = a;
	for (let is = 0; is < savetable.length; is++) {

		if (typeof (savetable[is].nowdata) == 'string') {
			var daitidata = savetable[is].nowdata;
		} else {
			var daitidata = JSON.stringify(savetable[is].nowdata);
		}
		if (typeof (savetable[is].tabledata) == 'string') {
			var daitidata1 = savetable[is].tabledata;
		} else {
			var daitidata1 = JSON.stringify(savetable[is].tabledata);
		}


		if ($('#' + savetable[is].paraname + 'page')[0]) {


		} else {
			$('body').append(savetable[is].page)
		}

		if (savetable[is].daochuend > 1) {
			$("#" + savetable[is].paraname + "page").show();
		} else {
			$("#" + savetable[is].paraname + "page").hide();
		}

		if (savetable[is].kzdirection == '纵向扩展') {
			var shi5 = [];
			var shi6 = []
			for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
				if (savetable[is].kzresourcedataitemarray[ii].itemdata !== '序号' && savetable[is].kzresourcedataitemarray[ii].itemdata !==
					'班次' && savetable[is].kzresourcedataitemarray[ii].itemdata !== '归档时间') {
					if (savetable[is].kzresourcedataitemarray[ii].xsnumber) {
						var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');

						let a = {
							id: parseInt(shi2[0]) - parseInt(savetable[is].startpox),
							xsnumber: parseInt(savetable[is].kzresourcedataitemarray[ii].xsnumber),
							defauldisplay: savetable[is].kzresourcedataitemarray[ii].defauldisplay,
						}
						shi5.push(a)
					}
				}
			}
			for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
				if (savetable[is].kzresourcedataitemarray[ii].itemdata == '归档时间') {
					var shi7 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
					let a = {
						id: parseInt(shi7[0]) - parseInt(savetable[is].startpox),
						itemformat: savetable[is].kzresourcedataitemarray[ii].itemformat
					}
					shi6.push(a)
				}
			}
			var shi1 = [];
			for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
				var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
				shi1.push(parseInt(shi2[0]) - parseInt(savetable[is].startpox))
			}
			if (savetable[is].kzsummotype == '') {

				var ab = 0;
				var ab2 = 0;
				var num = parseInt(savetable[is].startpoy) + 1;
				var num1 = parseInt(savetable[is].startpoy) + 1;
				var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;

				if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
					s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
				}

				var s10 = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy);
				if (s10 > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1) {
					s10 = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1
				}


				for (var i = 0; i < s10; i++) {
					ab2 = 0;
					for (var v = 0; v < s11; v++) {
						$($("#" + savetable[is].paraname).find(`#row-` + num1)[0]).find('.dataready')[ab2].innerHTML = '';
						ab2++;
					}
					num1++;
				}
				if (checked == 1) {

					var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;


					var s10 = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy);
					if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
						s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
					}
					if (s10 > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1) {
						s10 = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1
					}
					for (var i = 0; i < s10; i++) {
						ab = 0;
						for (var j = 0; j < s11; j++) {
							let an = i * (s11) + j;
							if (parseInt(an) >= savetable[is].nowdata.length) {
								savetable[is].nowdata.push({
									value: null,
									modifyname: '辅助项',
								})

							}
							if (shi1.indexOf(ab) > -1) { } else {
								savetable[is].nowdata.splice(an, 0, {
									value: null,
									modifyname: '辅助项'
								})
							}
							if (savetable[is].nowdata[an].value == 'null') {
								savetable[is].nowdata[an].value = '';
							}
							if (savetable[is].nowdata[an].modifyname !== null) {

								var inp = document.createElement('input');
								// var xnumber = '';
								// var de = '';
								// var itemformat = null;
								// for (let i1 = 0; i1 < shi5.length; i1++) {
								// 	if (shi5[i1].id == ab) {
								// 		xnumber = shi5[i1].xsnumber;
								// 		de = shi5[i1].defauldisplay;

								// 		break;
								// 	} else {
								// 		xnumber = '';
								// 		de = '';

								// 	}
								// }
								// for (let i1 = 0; i1 < shi6.length; i1++) {
								// 	if (shi6[i1].id == ab) {
								// 		itemformat = shi6[i1].itemformat;
								// 		break
								// 	} else {
								// 		itemformat = null
								// 	}
								// }
								// inp.id = savetable[is].nowdata[an].id;
								// if (xnumber !== '') {
								// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null) {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
								// 	}
								// } else {
								// 	if (savetable[is].nowdata[an].value == null) {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = savetable[is].nowdata[an].value;
								// 	}
								// }
								// if (inp.value !== null && inp.value !== '') {
								// 	if (itemformat !== null) {
								// 		inp.value = dateFormat(itemformat, new Date(inp.value))
								// 	}
								// }

								// inp.style.height = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight +
								// 	'px';
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
									'px'
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
								inp.readOnly = true;
								inp.id = savetable[is].nowdata[an].id;
								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
								let re = /\bafter\b/;
								if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].className)) {
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.remove("after");
								}
							} else {
								var div = document.createElement('div');
								div.classList.add('tip')
								var inp = document.createElement('input');
								if (shi1.indexOf(ab) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								var xnumber = '';
								var de = '';
								var itemformat = null
								inp.id = savetable[is].nowdata[an].id;

								for (let i1 = 0; i1 < shi5.length; i1++) {
									if (shi5[i1].id == ab) {
										xnumber = shi5[i1].xsnumber;
										de = shi5[i1].defauldisplay;

										break;
									} else {

										xnumber = '';
										de = '';
									}
								}
								for (let i1 = 0; i1 < shi6.length; i1++) {
									if (shi6[i1].id == ab) {
										itemformat = shi6[i1].itemformat;
										break
									} else {
										itemformat = null
									}
								}
								if (xnumber !== '') {
									if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
										xnumber) == '') {

										if (de == 'null') {
											de = ''
										}
										inp.value = de;


									} else {
										inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									}

								} else {
									if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

										if (de == 'null') {
											de = ''
										}
										inp.value = de;

									} else {
										inp.value = savetable[is].nowdata[an].value;
									}

								}
								if (inp.value !== null && inp.value !== '') {

									if (itemformat !== null) {
										inp.value = dateFormat(itemformat, new Date(inp.value))
									}
								}
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') == 'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

								}
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
								inp.readOnly = true;
								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
								div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id)
								var id = '#' + "r" + $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id;
								var p1 = document.createElement('p');
								// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
								var p2 = document.createElement('p');
								// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
								div.appendChild(p1);
								div.appendChild(p2);
							}
							ab++;
						}
						$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).addClass("daochu");
						num++;
					}
				} else {

					var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;
					var s10 = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy);
					if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
						s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
					}
					if (s10 > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1) {
						s10 = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1
					}
					for (var i = 0; i < s10; i++) {
						ab = 0;
						for (var j = 0; j < s11; j++) {
							let an = i * (s11) + j;
							if (parseInt(an) >= savetable[is].nowdata.length) {
								savetable[is].nowdata.push({
									value: null,
									modify: '辅助项',
									id: null
								})
							}
							if (savetable[is].nowdata[an].modifyname !== null) {
								var inp = document.createElement('input');
								if (shi1.indexOf(ab) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								if (savetable[is].nowdata[an].value == 'null') {
									savetable[is].nowdata[an].value = '';
								}
								inp.id = savetable[is].nowdata[an].id;
								// var xnumber = '';
								// var de = ''
								// var itemformat = null;
								// for (let i1 = 0; i1 < shi5.length; i1++) {
								// 	if (shi5[i1].id == ab) {
								// 		xnumber = shi5[i1].xsnumber;
								// 		de = shi5[i1].defauldisplay;

								// 		break;
								// 	} else {
								// 		xnumber = '';
								// 		de = '';

								// 	}
								// }
								// for (let i1 = 0; i1 < shi6.length; i1++) {
								// 	if (shi6[i1].id == ab) {
								// 		itemformat = shi6[i1].itemformat;
								// 		break
								// 	} else {
								// 		itemformat = null
								// 	}
								// }
								// if (xnumber !== '') {
								// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
								// 			xnumber) == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
								// 	}

								// } else {
								// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = savetable[is].nowdata[an].value;
								// 	}
								// }
								// if (inp.value !== null && inp.value !== '') {
								// 	if (itemformat !== null) {
								// 		inp.value = dateFormat(itemformat, new Date(inp.value))

								// 	}
								// }

								if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') == 'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
								let re = /\bafter\b/;
								if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].className)) {
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.remove("after");
								}
							} else {

								var div = document.createElement('div');
								div.classList.add('tip')
								var inp = document.createElement('input');
								if (shi1.indexOf(ab) > -1) {

								} else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								var xnumber = '';
								var de = '';
								var itemformat = null;
								inp.id = savetable[is].nowdata[an].id;
								for (let i1 = 0; i1 < shi5.length; i1++) {
									if (shi5[i1].id == ab) {
										xnumber = shi5[i1].xsnumber;
										de = shi5[i1].defauldisplay;

										break;
									} else {
										xnumber = '';
										de = '';

									}
								}
								for (let i1 = 0; i1 < shi6.length; i1++) {
									if (shi6[i1].id == ab) {
										itemformat = shi6[i1].itemformat;
										break
									} else {
										itemformat = null
									}
								}

								if (xnumber !== '') {
									if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
										xnumber) == '') {

										if (de == 'null') {
											de = ''
										}
										inp.value = de;

									} else {
										inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									};
								} else {
									if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

										if (de == 'null') {
											de = ''
										}
										inp.value = de;

									} else {
										inp.value = savetable[is].nowdata[an].value;
									}
								}
								if (inp.value !== null && inp.value !== '') {
									if (itemformat !== null) {
										inp.value = dateFormat(itemformat, new Date(inp.value))

									}
								}
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') == 'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
								div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id)
								var id = '#' + "r" + $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id;
								var p1 = document.createElement('p');
								// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
								var p2 = document.createElement('p');
								// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
								div.appendChild(p1);
								div.appendChild(p2);
							}
							ab++;
						}
						$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).addClass("daochu");
						num++;
					}
				}

			}
			if (savetable[is].kzsummopos == "分布在前") {
				// 纵向分布在前
				var shi1 = [];
				var sumdata = savetable[is].kzsummotype.split(",");
				for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
					var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
					shi1.push(parseInt(shi2[0]) - parseInt(savetable[is].startpox))
				}
				var shi3 = [];
				var shi6 = []
				for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
					if (savetable[is].kzresourcedataitemarray[ii].itemdata == '序号' || savetable[is].kzresourcedataitemarray[ii].itemdata ==
						'班次' || savetable[is].kzresourcedataitemarray[ii].itemdata == '归档时间') {
						var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
						shi3.push(parseInt(shi2[0]) - parseInt(savetable[is].startpox));
					}
				}
				for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
					if (savetable[is].kzresourcedataitemarray[ii].itemdata == '归档时间') {
						var shi7 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
						let a = {
							id: parseInt(shi7[0]) - parseInt(savetable[is].startpox),
							itemformat: savetable[is].kzresourcedataitemarray[ii].itemformat
						}
						shi6.push(a)
					}
				}
				var ab = 0;
				var ab2 = 0;
				var ab3 = 0;
				var num = savetable[is].startpoy;
				var num2 = savetable[is].startpoy;
				var num1 = parseInt(savetable[is].startpoy) + parseInt(sumdata.length);
				var num3 = parseInt(savetable[is].startpoy) + parseInt(sumdata.length) + 1;
				var num31 = parseInt(savetable[is].startpoy) + parseInt(sumdata.length);
				var num4 = parseInt(savetable[is].startpoy) + parseInt(sumdata.length) + 1;
				var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;
				var s10 = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy);
				if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
					s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
				}
				if (s10 > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length) {
					s10 = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length
				}

				for (var i = 0; i < s10; i++) {
					ab2 = 0;
					for (var v = 0; v < s11; v++) {
						$($("#" + savetable[is].paraname).find(`#row-` + num4)[0]).find('.dataready')[ab2].innerHTML = '';
						ab2++;
					}
					num4++;
				}
				if (checked == 1) {

					var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;
					var num3 = parseInt(savetable[is].startpoy) + parseInt(sumdata.length) + 1;
					var s10 = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy);
					if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
						s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
					}
					if (s10 > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length) {
						s10 = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length
					}

					for (var i = 0; i < s10; i++) {
						ab = 0;
						for (var j = 0; j < s11; j++) {
							let an = i * s11 + j;
							if (parseInt(an) >= savetable[is].nowdata.length) {
								savetable[is].nowdata.push({
									value: null,
									modify: '辅助项'
								})
							}
							if (shi1.indexOf(ab) > -1) { } else {
								savetable[is].nowdata.splice(an, 0, {
									value: null,
									modify: '辅助项'
								})
							}

							if (savetable[is].nowdata[an].value == 'null') {
								savetable[is].nowdata[an].value = '';
							}
							if (savetable[is].nowdata[an].modify == "辅助项") {
								var inp = document.createElement('input');
								// var itemformat = null;
								// var xnumber = '';
								// var de = '';
								// inp.id = savetable[is].nowdata[an].id;
								// for (let i1 = 0; i1 < shi5.length; i1++) {
								// 	if (shi5[i1].id == ab) {
								// 		xnumber = shi5[i1].xsnumber;
								// 		de = shi5[i1].defauldisplay;
								// 		break;
								// 	} else {
								// 		xnumber = '';
								// 		de = '';
								// 	}
								// }
								// for (let i1 = 0; i1 < shi6.length; i1++) {
								// 	if (shi6[i1].id == ab) {
								// 		itemformat = shi6[i1].itemformat;
								// 		break
								// 	} else {
								// 		itemformat = null
								// 	}
								// }
								// if (xnumber !== '') {

								// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
								// 			xnumber) == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
								// 	};
								// } else {

								// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {


								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;



								// 	} else {
								// 		inp.value = savetable[is].nowdata[an].value;
								// 	}
								// }
								// if (inp.value !== null && inp.value !== '') {
								// 	if (itemformat !== null) {
								// 		inp.value = dateFormat(itemformat, new Date(inp.value))

								// 	}
								// }
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontWeight;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontFamily;
								inp.classList.add('inp');
								inp.readOnly = true;
								// alert("sad")

								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].appendChild(inp);
								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.add(savetable[is].nowdata[
									an].id);
								let re = /\bafter\b/;
								if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].className)) {
									// $($("#"+savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.remove("after");
								}
							} else {

								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.add(savetable[is].nowdata[
									an].id);
								var inp = document.createElement('input');
								if (shi1.indexOf(ab) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}

								var xnumber = '';
								var de = '';
								var itemformat = null;
								inp.id = savetable[is].nowdata[an].id;
								for (let i1 = 0; i1 < shi5.length; i1++) {
									if (shi5[i1].id == ab) {
										xnumber = shi5[i1].xsnumber;
										de = shi5[i1].defauldisplay;
										break;
									} else {
										xnumber = '';
									}
								}
								for (let i1 = 0; i1 < shi6.length; i1++) {
									if (shi6[i1].id == ab) {
										itemformat = shi6[i1].itemformat;
										break
									} else {
										itemformat = null
									}
								}

								if (xnumber !== '') {
									if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
										xnumber) == '') {
										if (de !== '') {
											if (de == 'null') {
												de = ''
											}

											inp.value = de;
										} else {
											inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber)

										}
									} else {
										inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									}
								} else {
									if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

										if (de == 'null') {
											de = ''
										}
										inp.value = de;

									} else {
										inp.value = savetable[is].nowdata[an].value;
									}
								}
								if (inp.value !== null && inp.value !== '') {
									if (itemformat !== null) {
										inp.value = dateFormat(itemformat, new Date(inp.value))

									}
								}
								inp.readOnly = true;
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontWeight;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontFamily;
								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].appendChild(inp);

								var div = document.createElement('div');
								div.classList.add('tip')
								div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id)
								var id = '#' + "r" + $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id;
								var p1 = document.createElement('p');
								// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
								var p2 = document.createElement('p');
								// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
								div.appendChild(p1);
								div.appendChild(p2);
							}
							ab++;
						}
						$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).addClass("daochu");
						num3++
					}
					var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;
					var s10 = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy);
					if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
						s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
					}
					if (s10 > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length) {
						s10 = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length
					}
					var num3 = parseInt(savetable[is].startpoy) + parseInt(sumdata.length) + 1;
					var num31 = parseInt(savetable[is].startpoy) + parseInt(sumdata.length) + 1
					var reg = new RegExp("^[0-9]*$");

					for (let j = 0; j < sumdata.length; j++) {
						if (sumdata[j] == 'sum') {

							var totalRow = 0
							ab3 = 0
							num2 = parseInt(savetable[is].startpoy) + j + 1;
							var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;
							let endv = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy) + num31;
							if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
								s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
							}
							if (endv > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
								num31) {
								endv = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
									num31
							}
							for (let v1 = 0; v1 < s11; v1++) {
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								var pdz = false
								hjgpj = 0;


								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {
										hjgpj = parseFloat(hjgpj) + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[
											v1].value);
									}
								}
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}


								} else {

									if (result == true) {


										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											for (let ss = 0; ss < shi5.length; ss++) {
												if (shi5[ss].id == ab3) {
													hjgpj = getPointNum(hjgpj, shi5[ss].xsnumber);
												}
											}
											if (ab3 !== 0) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = hjgpj;
											}
											if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = hjgpj;
											}


										}
									}

								}
								if (shi1.indexOf(ab3) > -1) { } else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = null;
									}
								}
								ab3++;
							}

						} else if (sumdata[j] == 'mean') {

							var totalRow = 0
							var length = 0;
							ab3 = 0
							num2 = parseInt(savetable[is].startpoy) + j + 1;
							var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;

							let endv = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy) + num31;
							if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
								s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
							}
							if (endv > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
								num31) {
								endv = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
									num31
							}
							for (let v1 = 0; v1 < s11; v1++) {
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								var pdz = false
								hjgpj = 0;
								var length = 0;
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {
										hjgpj = parseFloat(hjgpj) + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[
											v1].value);
										length++;
									}
								}
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}


								} else {

									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											var meandata = hjgpj / length;
											for (let ss = 0; ss < shi5.length; ss++) {
												if (shi5[ss].id == ab3) {
													meandata = getPointNum(meandata, shi5[ss].xsnumber);
												}
											}
											if (isNaN(meandata)) {
												meandata = 0
											}
											if (ab3 !== 0) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = meandata;
											}
											if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = meandata;
											}


										}
									}

								}
								if (shi1.indexOf(ab3) > -1) { } else {

									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = null;
									}



								}
								ab3++;
							}

						} else if (sumdata[j] == 'min') {
							ab3 = 0;
							num2 = parseInt(savetable[is].startpoy) + j + 1;
							var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;


							let endv = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy) + num31;
							if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
								s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
							}
							if (endv > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
								num31) {
								endv = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
									num31
							}
							for (let v1 = 0; v1 < s11; v1++) {
								hjgpj = 0;
								var gdata = [];
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								var pdz = false
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}

									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {

										gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value));
									}
								}

								gdata.sort(function (a, b) {
									return a - b;
								})
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}


								} else {

									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}



										} else {
											if (gdata[0] == undefined) {
												gdata[0] = 0
											}
											if (ab3 !== 0) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[0];
											}
											if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[0];
											}


										}
									}

								}
								if (shi1.indexOf(ab3) > -1) { } else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = null;
									}


								}
								ab3++;
							}
						} else if (sumdata[j] == 'max') {
							ab3 = 0;
							num2 = parseInt(savetable[is].startpoy) + j + 1;
							var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;
							let endv = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy) + num31;
							for (let v1 = 0; v1 < s11; v1++) {
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								var pdz = false
								hjgpj = 0;
								var length = 0;
								var gdata = [];
								if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
									s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
								}
								if (endv > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
									num31) {
									endv = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
										num31
								}
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) || !($($("#" +
											savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value)) { } else {
										gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value));
									}
								}
								gdata.sort(function (a, b) {
									return a - b;
								})
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}



								} else {

									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}



										} else {
											if (gdata.length - 1 < 0) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0


											} else {
												if (ab3 !== 0) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[
														gdata.length - 1];
												}
												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[
														gdata.length - 1];
												}


											}
										}
									}

								}
								if (shi1.indexOf(ab3) > -1) {

								} else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = null;
									}


								}
								ab3++;
							}
						}
					}


				} else {

					var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;
					var s10 = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy);
					if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
						s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
					}
					if (s10 > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length) {
						s10 = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length
					}

					var num3 = parseInt(savetable[is].startpoy) + parseInt(sumdata.length) + 1;
					var reg = new RegExp("^[0-9]*$");
					for (var i = 0; i < s10; i++) {
						ab = 0;
						for (var j = 0; j < s11; j++) {
							let an = i * s11 + j;

							if (parseInt(an) >= savetable[is].nowdata.length) {
								savetable[is].nowdata.push({
									value: null,
									modify: '辅助项'
								})
							}
							if (savetable[is].nowdata[an])
								if (shi1.indexOf(ab) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null,
										modify: '辅助项',
										no: 0
									})
								}
							if (savetable[is].nowdata[an].value == 'null') {
								savetable[is].nowdata[an].value = '';
							}
							if (savetable[is].nowdata[an].modify == "辅助项") {
								var inp = document.createElement('input');
								// var xnumber = '';
								// var de = '';
								// var itemformat = null;
								// inp.id = savetable[is].nowdata[an].id;
								// for (let i1 = 0; i1 < shi5.length; i1++) {
								// 	if (shi5[i1].id == ab) {
								// 		xnumber = shi5[i1].xsnumber;
								// 		de = shi5[i1].defauldisplay;
								// 		break;
								// 	} else {
								// 		xnumber = '';
								// 		de = '';
								// 	}
								// }
								// for (let i1 = 0; i1 < shi6.length; i1++) {
								// 	if (shi6[i1].id == ab) {
								// 		itemformat = shi6[i1].itemformat;
								// 		break
								// 	} else {
								// 		itemformat = null
								// 	}
								// }
								// if (xnumber !== '') {
								// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
								// 			xnumber) == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
								// 	}
								// } else {
								// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = savetable[is].nowdata[an].value;
								// 	}
								// }
								// if (inp.value !== null && inp.value !== '') {
								// 	if (itemformat !== null) {
								// 		inp.value = dateFormat(itemformat, new Date(inp.value))
								// 		console.log(itemformat)
								// 	}
								// }
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.readOnly = true;
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontFamily;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontFamily;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontWeight;

								inp.classList.add('inp');
								if (savetable[is].nowdata[an].modifyname !== null) {
									// $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.add('after')
								}
								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].appendChild(inp);
								let re = /\bafter\b/;
								if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].className)) {
									$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.remove("after");
								}
							} else {
								var inp = document.createElement('input');

								var xnumber = '';
								var de = '';
								var itemformat = null;
								inp.id = savetable[is].nowdata[an].id;
								for (let i1 = 0; i1 < shi5.length; i1++) {
									if (shi5[i1].id == ab) {
										xnumber = shi5[i1].xsnumber;
										de = shi5[i1].defauldisplay;
										break;
									} else {
										xnumber = '';
										de = '';
									}
								}
								for (let i1 = 0; i1 < shi6.length; i1++) {
									if (shi6[i1].id == ab) {
										itemformat = shi6[i1].itemformat;
										break
									} else {
										itemformat = null
									}
								}
								if (xnumber !== '') {
									if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
										xnumber) == '') {
										if (de !== '' && inp.id !== "undefined") {
											if (de == 'null') {
												de = ''
											}
											inp.value = de;
										} else {
											inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber)
										}
									} else {
										inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									}
								} else {
									if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {
										if (de !== '' && inp.id !== "undefined") {
											if (de == 'null') {
												de = ''
											}
											inp.value = de;
										} else {
											inp.value = savetable[is].nowdata[an].value
										}
									} else {
										inp.value = savetable[is].nowdata[an].value;
									}
								}
								if (inp.value !== null && inp.value !== '') {
									if (itemformat !== null) {
										inp.value = dateFormat(itemformat, new Date(inp.value))

									}
								}
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontFamily;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontWeight;

								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].appendChild(inp);
								if (savetable[is].nowdata[an].modifyname !== null) {
									// $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.add('after')
								}
								var div = document.createElement('div');
								div.classList.add('tip')
								div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id)
								var id = '#' + "r" + $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id;
								var p1 = document.createElement('p');
								// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
								var p2 = document.createElement('p');
								// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
								div.appendChild(p1);
								div.appendChild(p2);
							}
							ab++;
						}
						$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).addClass("daochu");
						num3++

					}
					var num31 = parseInt(savetable[is].startpoy) + parseInt(sumdata.length) + 1

					for (let j = 0; j < sumdata.length; j++) {
						if (sumdata[j] == 'sum') {
							var totalRow = 0
							ab3 = 0
							num2 = parseInt(savetable[is].startpoy) + j + 1;
							var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;
							let endv = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy) + num31;
							if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
								s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
							}
							if (endv > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
								num31) {
								endv = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
									num31
							}
							for (let v1 = 0; v1 < s11; v1++) {
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								var pdz = false
								hjgpj = 0;
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {
										hjgpj = parseFloat(hjgpj) + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[
											v1].value);
									}
								}
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}


								} else {

									if (result == true) {

										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											for (let ss = 0; ss < shi5.length; ss++) {
												if (shi5[ss].id == ab3) {
													hjgpj = getPointNum(hjgpj, shi5[ss].xsnumber);
												}
											}
											if (ab3 !== 0) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = hjgpj;
											}
											if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = hjgpj;
											}

										}
									}

								}
								if (shi1.indexOf(ab3) > -1) { } else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = null;
									}


								}
								ab3++;
							}

						} else if (sumdata[j] == 'mean') {

							var totalRow = 0
							var length = 0;
							ab3 = 0
							num2 = parseInt(savetable[is].startpoy) + j + 1;
							var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;

							let endv = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy) + num31;
							if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
								s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
							}
							if (endv > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
								num31) {
								endv = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
									num31
							}
							for (let v1 = 0; v1 < s11; v1++) {
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								var pdz = false
								hjgpj = 0;
								var length = 0;
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {
										hjgpj = parseFloat(hjgpj) + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[
											v1].value);
										length++;
									}
								}
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}


								} else {

									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											var meandata = hjgpj / length;
											for (let ss = 0; ss < shi5.length; ss++) {
												if (shi5[ss].id == ab3) {
													meandata = getPointNum(meandata, shi5[ss].xsnumber);
												}
											}
											if (isNaN(meandata)) {
												meandata = 0
											}
											if (ab3 !== 0) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = meandata;
											}
											if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = meandata;
											}


										}
									}

								}
								if (shi1.indexOf(ab3) > -1) { } else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = null;
									}

								}
								ab3++;
							}

						} else if (sumdata[j] == 'min') {
							ab3 = 0;
							num2 = parseInt(savetable[is].startpoy) + j + 1;
							var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;


							let endv = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy) + num31;
							if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
								s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
							}
							if (endv > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
								num31) {
								endv = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
									num31
							}
							for (let v1 = 0; v1 < s11; v1++) {
								hjgpj = 0;
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								var pdz = false
								var gdata = [];
								;
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {

										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {

										gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value));
									}
								}

								gdata.sort(function (a, b) {
									return a - b;
								})
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}


								} else {

									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = '\\';
											}



										} else {
											if (gdata[0] == undefined) {
												gdata[0] = 0
											}
											if (ab3 !== 0) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[0];
											}
											if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[0];
											}


										}
									}

								}
								if (shi1.indexOf(ab3) > -1) { } else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = null;
									}

								}
								ab3++;
							}
						} else if (sumdata[j] == 'max') {
							ab3 = 0;
							num2 = parseInt(savetable[is].startpoy) + j + 1;
							var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;
							let endv = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy) + num31;
							for (let v1 = 0; v1 < s11; v1++) {
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								var pdz = false
								hjgpj = 0;
								var length = 0;
								var gdata = [];
								if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
									s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
								}
								if (endv > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
									num31) {
									endv = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy) - 1 - sumdata.length +
										num31
								}
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) || !($($("#" +
											savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value)) { } else {
										gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value));
									}
								}
								gdata.sort(function (a, b) {
									return a - b;
								})
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}



								} else {

									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}



										} else {
											if (gdata.length - 1 < 0) {
												if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0
												}
												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0
												}


											} else {
												if (ab3 !== 0) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[
														gdata.length - 1];
												}
												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[
														gdata.length - 1];
												}


											}
										}
									}

								}
								if (shi1.indexOf(ab3) > -1) {

								} else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = null;
									}

								}
								ab3++;
							}
						}
					}
				}

			} else if (savetable[is].kzsummopos == "分布在后") {
				// alert("2")
				// 纵向分布在后
				var sumdata = savetable[is].kzsummotype.split(",");
				var reg = new RegExp("^[0-9]*$");
				var ab = 0;
				var ab2 = 0;
				var ab3 = 0;
				var num = savetable[is].startpox;
				var num2 = savetable[is].startpox;
				var num1 = parseInt(savetable[is].startpoy) + parseInt(sumdata.length);
				var num3 = parseInt(savetable[is].startpoy) + 1;
				var num4 = parseInt(savetable[is].startpoy) + 1;
				redhead = savetable[is].startpox;
				var s11 = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) + 1;
				if (s11 > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
					s11 = $("#" + savetable[is].paraname).find('.datareadyhead').length
				}
				// var s10 = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy);
				var sumnum = 0;
				for (let i2 = 0; i2 < $("#" + savetable[is].paraname).find('tr').length; i2++) {
					for (let i3 = 0; i3 < $($("#" + savetable[is].paraname).find('tr')[i2]).find('td').length; i3++) {
						if ($($($("#" + savetable[is].paraname).find('tr')[i2]).find('td')[i3]).hasClass('datareadyfoot')) {
							sumnum = sumnum + 1;
							break
						}
					}
				}

				var xnum = 0;
				for (let i2 = 0; i2 < $("#" + savetable[is].paraname).find('tr').length; i2++) {
					for (let i3 = 0; i3 < $($("#" + savetable[is].paraname).find('tr')[i2]).find('td').length; i3++) {
						if ($($($("#" + savetable[is].paraname).find('tr')[i2]).find('td')[i3]).hasClass('dataready')) {
							xnum = xnum + 1;
							break
						}
					}
				}
				s10 = xnum;

				for (var i = 0; i < s10; i++) {
					ab2 = 0;
					for (var v = 0; v < s11; v++) {
						$($("#" + savetable[is].paraname).find(`#row-` + num4)[0]).find('.dataready')[ab2].innerHTML = '';
						ab2++;
					}
					num4++;
				}
				if (checked == 2) {

					var shi1 = [];
					for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
						var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
						shi1.push(parseInt(shi2[0]) - parseInt(savetable[is].startpox))
					}
					for (var i = 0; i < s10; i++) {
						ab = 0;
						for (var j = 0; j < s11; j++) {
							let an = i * s11 + j;
							if (parseInt(an) >= savetable[is].nowdata.length) {
								savetable[is].nowdata.push({
									value: null,
									modify: '辅助项'
								})

							}
							if (savetable[is].nowdata[an].modify == "辅助项") {
								var inp = document.createElement('input');
								if (shi1.indexOf(ab) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								if (savetable[is].nowdata[an].value == 'null') {
									savetable[is].nowdata[an].value = '';
								}
								// var de = '';
								// var xnumber = ''
								// var itemformat = null;
								// inp.id = savetable[is].nowdata[an].id;
								// for (let i1 = 0; i1 < shi5.length; i1++) {
								// 	if (shi5[i1].id == ab) {
								// 		xnumber = shi5[i1].xsnumber;
								// 		de = shi5[i1].defauldisplay;
								// 		break;
								// 	} else {
								// 		xnumber = '';
								// 		de = '';
								// 	}
								// }
								// for (let i1 = 0; i1 < shi6.length; i1++) {
								// 	if (shi6[i1].id == ab) {
								// 		itemformat = shi6[i1].itemformat;
								// 		break
								// 	} else {
								// 		itemformat = null
								// 	}
								// }
								// if (xnumber !== '') {
								// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
								// 			xnumber) == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
								// 	};
								// } else {
								// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = savetable[is].nowdata[an].value;
								// 	}
								// }
								// if (inp.value !== null && inp.value !== '') {
								// 	if (itemformat !== null) {
								// 		inp.value = dateFormat(itemformat, new Date(inp.value))
								// 		console.log(itemformat)
								// 	}
								// }
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontFamily;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontWeight;

								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].appendChild(inp);
								let re = /\bafter\b/;
								if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].className)) {
									$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.remove("after");
								}
							} else {
								var inp = document.createElement('input');
								if (shi1.indexOf(ab) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								var xnumber = '';
								var de = '';
								var itemformat = null;
								inp.id = savetable[is].nowdata[an].id;
								for (let i1 = 0; i1 < shi5.length; i1++) {
									if (shi5[i1].id == ab) {
										xnumber = shi5[i1].xsnumber;
										de = shi5[i1].defauldisplay;
										break;
									} else {
										xnumber = '';
										de = '';
									}
								}
								for (let i1 = 0; i1 < shi6.length; i1++) {
									if (shi6[i1].id == ab) {
										itemformat = shi6[i1].itemformat;
										break
									} else {
										itemformat = null
									}
								}
								// console.log("xnumber1",shi5)
								if (xnumber !== '') {
									if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null) {

										if (de == 'null') {
											de = ''
										}
										inp.value = de
									} else {
										inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									};
								} else {
									if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

										if (de == 'null') {
											de = ''
										}
										inp.value = de;

									} else {
										inp.value = savetable[is].nowdata[an].value;
									}
								}
								if (inp.value !== null && inp.value !== '') {
									if (itemformat !== null) {
										inp.value = dateFormat(itemformat, new Date(inp.value))

									}
								}
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontFamily;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontWeight;

								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].appendChild(inp);
								var div = document.createElement('div');
								div.classList.add('tip')
								div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id)
								var id = '#' + "r" + $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id;
								var p1 = document.createElement('p');
								// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
								var p2 = document.createElement('p');
								// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
								div.appendChild(p1);
								div.appendChild(p2);
							}
							ab++;
						}
						$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).addClass("daochu");
						num3++
					}
					var num31 = parseInt(savetable[is].startpoy) + 1;
					var shi3 = [];
					for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
						if (savetable[is].kzresourcedataitemarray[ii].itemdata == '序号' || savetable[is].kzresourcedataitemarray[ii].itemdata ==
							'班次' || savetable[is].kzresourcedataitemarray[ii].itemdata == '归档时间') {
							var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
							shi3.push(parseInt(shi2[0]) - parseInt(savetable[is].startpox));
						}
					}
					for (let j = 0; j < sumnum; j++) {

						if (sumdata[j] == 'sum') {
							var totalRow = 0
							ab3 = 0
							num2 = parseInt(savetable[is].startpoy) + s10 + j + 1;
							let endv = s10 + parseInt(num31);
							for (let v1 = 0; v1 < s11; v1++) {
								var pdz = false
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								hjgpj = 0;
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {
										hjgpj = parseFloat(hjgpj) + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[
											v1].value);
									}
								}

								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}


								} else {


									if (result == true) {

										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}



										} else {
											for (let ss = 0; ss < shi5.length; ss++) {
												if (shi5[ss].id == ab3) {
													hjgpj = getPointNum(hjgpj, shi5[ss].xsnumber);
												}
											}
											if (ab3 !== 0) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = hjgpj;
											}
											if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = hjgpj;
											}


										}
									}


								}
								if (shi1.indexOf(ab3) > -1) {

								} else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = null;
									}

								}
								ab3++;
							}

						} else if (sumdata[j] == 'mean') {

							ab3 = 0;
							num2 = parseInt(savetable[is].startpoy) + s10 + j + 1;
							let endv = s10 + parseInt(num31);
							for (let v1 = 0; v1 < s11; v1++) {
								hjgpj = 0;
								var length = 0;
								var pdz = false
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})

								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {
										hjgpj = parseFloat(hjgpj) + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[
											v1].value);
										length++;

									}
								}
								gpj = hjgpj / length;
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}



								} else {


									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											for (let ss = 0; ss < shi5.length; ss++) {
												if (shi5[ss].id == ab3) {
													gpj = getPointNum(gpj, shi5[ss].xsnumber);
												}
											}
											if (isNaN(gpj)) {
												gpj = 0;
											}
											if (ab3 !== 0) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gpj;
											}
											if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gpj;
											}

										}
									}


								}
								if (shi1.indexOf(ab3) > -1) {

								} else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = '';
									}

								}
								ab3++;
							}
						} else if (sumdata[j] == 'min') {
							ab3 = 0;
							num2 = parseInt(savetable[is].startpoy) + s10 + j + 1;
							let endv = s10 + parseInt(num31);
							for (let v1 = 0; v1 < s11; v1++) {
								var gdata = [];
								hjgpj = 0;
								var pdz = false
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {

										gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value));
									}
								}
								gdata.sort(function (a, b) {
									return a - b;
								})
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}



								} else {

									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											if (gdata[0] == undefined) {
												if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0;
												}
												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0;
												}

												// }

											} else {
												if (ab3 !== 0) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[0];
												}
												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[0];
												}


											}
										}
									}


								}
								if (shi1.indexOf(ab3) > -1) {

								} else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = '';
									}

								}
								ab3++;
							}
						} else if (sumdata[j] == 'max') {
							ab3 = 0;
							num2 = parseInt(savetable[is].startpoy) + s10 + j + 1;
							let endv = s10 + parseInt(num31);
							for (let v1 = 0; v1 < s11; v1++) {
								var pdz = false
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								var gdata = [];
								hjgpj = 0;
								var length = 0;
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {
										gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value));
									}
								}
								gdata.sort(function (a, b) {
									return a - b;
								})
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}



								} else {
									let aindex;
									let result = shi5.some(function (item, index) {
										if (item.id == ab3) {
											aindex = index;
											return true;
										}
									})
									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											if (gdata[gdata.length - 1] == undefined) {
												if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0;
												}
												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0
												}

											} else {
												if (ab3 !== 0) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[
														gdata.length - 1];
												}
												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[
														gdata.length - 1];
												}

											}
										}
									}


								}
								if (shi1.indexOf(ab3) > -1) {

								} else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = '';
									}

								}
								ab3++;
							}
						}
					}
				} else {
					var shi1 = [];
					for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
						var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
						shi1.push(parseInt(shi2[0]) - parseInt(savetable[is].startpox))
					}
					var shi3 = [];
					for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
						if (savetable[is].kzresourcedataitemarray[ii].itemdata == '序号' || savetable[is].kzresourcedataitemarray[ii].itemdata ==
							'班次' || savetable[is].kzresourcedataitemarray[ii].itemdata == '归档时间') {
							var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
							shi3.push(parseInt(shi2[0]) - parseInt(savetable[is].startpox));

						}


					}
					for (var i = 0; i < s10; i++) {
						ab = 0;
						for (var j = 0; j < s11; j++) {
							let an = i * s11 + j;
							if (parseInt(an) >= savetable[is].nowdata.length) {
								savetable[is].nowdata.push({
									value: null,
									modify: '辅助项',
									modifyname: "aa"
								})

							}
							if (savetable[is].nowdata[an].value == 'null') {
								savetable[is].nowdata[an].value = '';
							}
							if (savetable[is].nowdata[an].modify == "辅助项") {
								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].innerHTML = savetable[is].nowdata[
									an].value;
								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.add(savetable[is].nowdata[
									an].id);
								let re = /\bafter\b/;
								if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].className)) {
									$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.remove("after");
								}
								var inp = document.createElement('input');
								inp.id = savetable[is].nowdata[an].id;
								inp.classList.add('inp')

								if (shi1.indexOf(ab) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								// var xnumber = '';
								// var de = '';
								// var itemformat = null;
								// for (let i1 = 0; i1 < shi5.length; i1++) {
								// 	if (shi5[i1].id == ab) {
								// 		xnumber = shi5[i1].xsnumber;
								// 		de = shi5[i1].defauldisplay;
								// 		break;
								// 	} else {
								// 		xnumber = '';
								// 		de = '';
								// 	}
								// }
								// for (let i1 = 0; i1 < shi6.length; i1++) {
								// 	if (shi6[i1].id == ab) {
								// 		itemformat = shi6[i1].itemformat;
								// 		break
								// 	} else {
								// 		itemformat = null
								// 	}
								// }
								// if (xnumber !== '') {
								// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
								// 			xnumber) == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
								// 	};
								// } else {
								// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = savetable[is].nowdata[an].value;
								// 	}
								// }
								// if (inp.value !== null && inp.value !== '') {
								// 	if (itemformat !== null) {
								// 		inp.value = dateFormat(itemformat, new Date(inp.value))
								// 		console.log(itemformat)
								// 	}
								// }
								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id
								$(inp).width($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientWidth);
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								} else {
									$(inp).height($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight);
								}

								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.backgroundColor;

								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].appendChild(inp);
								inp.readOnly = true;
							} else {
								var inp = document.createElement('input');
								if (shi1.indexOf(ab) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								var xnumber = '';
								var de = '';
								var itemformat = null;
								for (let i1 = 0; i1 < shi5.length; i1++) {
									if (shi5[i1].id == ab) {
										xnumber = shi5[i1].xsnumber;
										de = shi5[i1].defauldisplay;
										break;
									} else {
										xnumber = '';
										de = '';
									}
								}
								for (let i1 = 0; i1 < shi6.length; i1++) {
									if (shi6[i1].id == ab) {
										itemformat = shi6[i1].itemformat;
										break
									} else {
										itemformat = null
									}
								}
								if (xnumber !== '') {
									if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
										xnumber) == '') {

										if (de == 'null') {
											de = ''
										}
										inp.value = de;

									} else {
										inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									};
								} else {
									if (savetable[is].nowdata[an].value == null) {

										if (de == 'null') {
											de = ''
										}
										inp.value = de;

									} else {
										inp.value = savetable[is].nowdata[an].value;
									}
								}
								if (inp.value !== null && inp.value !== '') {
									if (itemformat !== null) {
										inp.value = dateFormat(itemformat, new Date(inp.value))

									}
								}
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') ==
									'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab]).attr('valign') == 'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}

								var ss = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontStyle;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.textDecoration;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontFamily;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].style.fontWeight;
								inp.id = savetable[is].nowdata[an].id;
								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].appendChild(inp);
								inp.readOnly = true;
								//  $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.add('after')
								var div = document.createElement('div');
								div.classList.add('tip');
								$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].classList.add(savetable[is].nowdata[
									an].id);
								inp.classList.add('inp')
								div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id)
								var id = '#' + "r" + $($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).find('.dataready')[ab].id;
								var p1 = document.createElement('p');
								// p1.innerHTML = "修改人:" + data[an].modifyname;
								var p2 = document.createElement('p');
								// p2.innerHTML = "修改时间:" + data[an].modifytime;
								div.appendChild(p1);
								div.appendChild(p2);
							}
							ab++;
						}
						$($("#" + savetable[is].paraname).find(`#row-` + num3)[0]).addClass("daochu");
						num3++

					}

					var num31 = parseInt(savetable[is].startpoy) + 1;

					for (let j = 0; j < sumnum; j++) {
						if (sumdata[j] == 'sum') {
							var totalRow = 0
							ab3 = 0
							num2 = parseInt(savetable[is].startpoy) + s10 + j + 1;
							let endv = s10 + parseInt(num31);
							let aindex;


							for (let v1 = 0; v1 < s11; v1++) {
								hjgpj = 0;
								var pdz = false
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {
										hjgpj = parseFloat(hjgpj) + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[
											v1].value);
									}
								}

								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {
										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}



								} else {


									if (result == true) {

										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											for (let ss = 0; ss < shi5.length; ss++) {
												if (shi5[ss].id == ab3) {
													hjgpj = getPointNum(hjgpj, shi5[ss].xsnumber);
												}
											}

											if (ab3 !== 0) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = hjgpj;
											}
											if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = hjgpj;
											}

											// }

										}
									}


								}
								if (shi1.indexOf(ab3) > -1) {

								} else {
									if ((ab3 + 1) !== parseFloat(savetable.startpox) && parseFloat(savetable.startpox) !== parseFloat(savetable.endpox)) {
										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = null;
									}

								}
								ab3++;
							}

						} else if (sumdata[j] == 'mean') {
							ab3 = 0;
							num2 = parseInt(savetable[is].startpoy) + s10 + j + 1;
							let endv = s10 + parseInt(num31);
							for (let v1 = 0; v1 < s11; v1++) {
								hjgpj = 0;
								var length = 0;
								var pdz = false
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})

								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {
										hjgpj = parseFloat(hjgpj) + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[
											v1].value);
										length++;

									}
								}
								gpj = hjgpj / length;
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}



								} else {

									if (result == true) {

										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											for (let ss = 0; ss < shi5.length; ss++) {
												if (shi5[ss].id == ab3) {
													gpj = getPointNum(gpj, shi5[ss].xsnumber);
												}
											}
											if (isNaN(gpj)) {
												gpj = 0;
											}
											if (ab3 !== 0) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gpj;
											}
											if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gpj;
											}




										}
									}


								}
								if (shi1.indexOf(ab3) > -1) {

								} else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = '';
									}

								}
								ab3++;
							}
						} else if (sumdata[j] == 'min') {
							ab3 = 0;
							num2 = parseInt(savetable[is].startpoy) + s10 + j + 1;
							let endv = s10 + parseInt(num31);
							for (let v1 = 0; v1 < s11; v1++) {
								var pdz = false
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								var gdata = [];
								hjgpj = 0;
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {

										gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value));
									}
								}
								gdata.sort(function (a, b) {
									return a - b;
								})
								if (shi3.indexOf(ab3) > -1) {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}




								} else {

									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											if (gdata[0] == undefined) {
												if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0;
												}
												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0;
												}


											} else {
												if (ab3 !== 0) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[0];
												}
												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[0];
												}

											}
										}
									}


								}
								if (shi1.indexOf(ab3) > -1) {

								} else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = '';
									}


								}
								ab3++;
							}
						} else if (sumdata[j] == 'max') {
							ab3 = 0;
							num2 = parseInt(savetable[is].startpoy) + s10 + j + 1;
							let endv = s10 + parseInt(num31);
							for (let v1 = 0; v1 < s11; v1++) {
								var gdata = [];
								hjgpj = 0;
								var length = 0;
								var pdz = false
								let aindex;
								let result = shi5.some(function (item, index) {
									if (item.id == ab3) {
										aindex = index;
										return true;
									}
								})
								for (let v = num31; v < endv; v++) {
									if (aindex !== undefined) {
										if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) && shi5[aindex]
											.defauldisplay !== $($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value) {
											pdz = true
										}
									}
									if ($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].id == "undefined" ||
										isNaN(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value))) { } else {
										gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v)[0]).find('.inp')[v1].value));
									}
								}
								gdata.sort(function (a, b) {
									return a - b;
								})
								if (shi3.indexOf(ab3) > -1) {

									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
									}



								} else {

									if (result == true) {
										if (pdz) {
											if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

												$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = "\\";
											}


										} else {
											if (gdata[gdata.length - 1] == undefined) {
												if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {

													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0;
												}

												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = 0
												}

											} else {


												if (ab3 !== 0) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[
														gdata.length - 1];
												}
												if (parseFloat(savetable[is].startpox) == parseFloat(savetable[is].endpox)) {
													$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = gdata[
														gdata.length - 1];
												}


											}
										}
									}


								}
								if (shi1.indexOf(ab3) > -1) {

								} else {
									if (ab3 !== 0 && parseFloat(savetable[is].startpox) !== parseFloat(savetable[is].endpox)) {


										$($("#" + savetable[is].paraname).find(`#row-` + num2)[0]).find('.datareadyfoot')[ab3].innerHTML = '';
									}

								}
								ab3++;
							}
						}
					}
				}
			}

		} else {
			// 横向扩展显示

			var shi5 = [];
			for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
				if (savetable[is].kzresourcedataitemarray[ii].itemdata !== '序号' && savetable[is].kzresourcedataitemarray[ii].itemdata !==
					'班次' && savetable[is].kzresourcedataitemarray[ii].itemdata !== '归档时间') {
					if (savetable[is].kzresourcedataitemarray[ii].xsnumber) {

						var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
						let a = {
							id: parseInt(shi2[1]),
							xsnumber: parseInt(savetable[is].kzresourcedataitemarray[ii].xsnumber),
							defauldisplay: savetable[is].kzresourcedataitemarray[ii].defauldisplay
						}
						shi5.push(a)
					}
				}
			}
			var shi6 = []
			for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
				if (savetable[is].kzresourcedataitemarray[ii].itemdata == '归档时间') {
					var shi7 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
					let a = {
						id: parseInt(shi7[1]),
						itemformat: savetable[is].kzresourcedataitemarray[ii].itemformat
					}
					shi6.push(a)
				}
			}
			var shi1 = [];
			for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
				var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
				shi1.push(parseInt(shi2[1]) - parseInt(savetable[is].startpoy))
			}
			var shi3 = [];
			for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
				if (savetable[is].kzresourcedataitemarray[ii].itemdata == '序号' || savetable[is].kzresourcedataitemarray[ii].itemdata ==
					'班次' || savetable[is].kzresourcedataitemarray[ii].itemdata == '归档时间') {
					var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
					shi3.push(parseInt(shi2[0]) - parseInt(savetable[is].startpox));
				}
			}
			// 分布
			if (savetable[is].kzsummotype == '') {
				// 横向扩展分布无
				var ab = 0;
				var ab2 = 0;
				var num = parseInt(savetable[is].startpoy);
				var num1 = savetable[is].startpoy;
				redhead = savetable[is].startpoy;
				var y = (parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy)) + 1;
				if (y > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
					y = $("#" + savetable[is].paraname).find('.datareadyhead').length
				}

				var xnum = 0;
				// for (let i3 = 0; i3 < $($("#" + savetable[is].paraname).find('tr')[parseInt(savetable[is].startpoy)]).find('td').length; i3++) {
				// 	if ($($($("#" + savetable[is].paraname).find('tr')[parseInt(savetable[is].startpoy)]).find('td')[i3]).hasClass('dataready')) {
				// 		xnum = xnum + 1;

				// 	}
				// }

				xnum = $($("#" + savetable[is].paraname).find('tr')[parseInt(savetable[is].startpoy)]).find('.dataready').length
				var x = xnum;
				for (var i = 0; i < y; i++) {
					ab2 = 0;
					for (var v = 0; v < x; v++) {

						$($("#" + savetable[is].paraname).find(`#row-` + num1)[0]).find('.dataready')[ab2].innerHTML = '';
						$($($("#" + savetable[is].paraname).find(`#row-` + num1)[0]).find('.dataready')[ab2]).addClass("del");
						ab2++;
					}
					num1++;
				}
				var shi1 = [];
				if (savetable[is].kzresourcedataitemarray !== []) {
					for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
						var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
						shi1.push(parseInt(shi2[1]))
					}
				}
				if (checked == 1) {


					for (var i = 0; i < x; i++) {
						var num = parseInt(savetable[is].startpoy);
						for (var j = 0; j < y; j++) {
							let an = i * y + j;
							if (parseInt(an) >= savetable[is].nowdata.length) {
								savetable[is].nowdata.push({
									value: null,
									modify: '辅助项',
									id: null
								})
							}
							if (savetable[is].nowdata[an].value == 'null') {
								savetable[is].nowdata[an].value = '';
							}
							if (savetable[is].nowdata[an].modifyname == null) {
								var inp = document.createElement('input');
								if (shi1.indexOf(num) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								var xnumber = '';
								var de = '';
								var itemformat = null;
								inp.id = savetable[is].nowdata[an].id;

								for (let i1 = 0; i1 < shi5.length; i1++) {
									if (shi5[i1].id == num) {
										xnumber = shi5[i1].xsnumber;
										de = shi5[i1].defauldisplay;
										break;
									} else {
										xnumber = '';
										de = '';
									}
								}
								for (let i1 = 0; i1 < shi6.length; i1++) {
									if (shi6[i1].id == num) {
										itemformat = shi6[i1].itemformat;
										break
									} else {
										itemformat = null
									}
								}

								if (xnumber !== '') {
									if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
										xnumber) == '') {

										if (de == 'null') {
											de = ''
										}

										if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
											inp.value = de
										}

									} else {

										inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									};
								} else {
									if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

										if (de == 'null') {
											de = ''
										}
										if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
											inp.value = de
										}

									} else {

										inp.value = savetable[is].nowdata[an].value;
									}
								}
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') == 'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								if (inp.value !== null && inp.value !== '') {
									if (itemformat !== null) {
										inp.value = dateFormat(itemformat, new Date(inp.value))
									}
								}
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
									'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;

								inp.readOnly = true;
								inp.classList.add('inp');

								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)


								let re = /\bafter\b/;
								if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].className)) {
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.remove("after");
								}

							} else {
								var inp = document.createElement('input');
								if (shi1.indexOf(num) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								// var xnumber = '';
								// var de = '';
								// var itemformat = null;
								// inp.id = savetable[is].nowdata[an].id;
								// for (let i1 = 0; i1 < shi5.length; i1++) {
								// 	if (shi5[i1].id == ab) {
								// 		xnumber = shi5[i1].xsnumber;
								// 		de = shi5[i1].defauldisplay;
								// 		break;
								// 	} else {
								// 		xnumber = '';
								// 		de = '';
								// 	}
								// }
								// for (let i1 = 0; i1 < shi6.length; i1++) {
								// 	if (shi6[i1].id == ab) {
								// 		itemformat = shi6[i1].itemformat;
								// 		break
								// 	} else {
								// 		itemformat = null
								// 	}
								// }
								// if (xnumber !== '') {
								// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
								// 			xnumber) == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
								// 	};
								// } else {
								// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = savetable[is].nowdata[an].value;
								// 	}
								// }
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') == 'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								if (inp.value !== null && inp.value !== '') {
									if (itemformat !== null) {
										inp.value = dateFormat(itemformat, new Date(inp.value))

									}
								}
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
									'px';
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].width = inp.style.width + 'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = ($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
								inp.readOnly = true;

								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.add('after')
								var div = document.createElement('div');
								div.classList.add('tip')
								div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id)
								var p1 = document.createElement('p');
								// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
								var p2 = document.createElement('p');
								// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
								div.appendChild(p1);
								div.appendChild(p2);
							}
							$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).addClass("daochu");
							num++;
						}
						ab++;
					}

				} else {

					for (var i = 0; i < x; i++) {
						var num = parseInt(savetable[is].startpoy);
						for (var j = 0; j < y; j++) {
							let an = i * y + j;
							if (parseInt(an) >= savetable[is].nowdata.length) {
								savetable[is].nowdata.push({
									value: null,
									modify: '辅助项',
									id: null
								})
							}
							if (savetable[is].nowdata[an].value == 'null') {
								savetable[is].nowdata[an].value = '';
							}
							if (savetable[is].nowdata[an].modifyname == null) {
								var inp = document.createElement('input');
								if (shi1.indexOf(num) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								var xnumber = '';
								var de = '';
								var itemformat = null;
								inp.id = savetable[is].nowdata[an].id;
								for (let i1 = 0; i1 < shi5.length; i1++) {
									if (shi5[i1].id == num) {
										xnumber = shi5[i1].xsnumber;
										de = shi5[i1].defauldisplay;
										break;
									} else {
										xnumber = '';
										de = '';
									}
								}
								for (let i1 = 0; i1 < shi6.length; i1++) {
									if (shi6[i1].id == num) {
										itemformat = shi6[i1].itemformat;
										break
									} else {
										itemformat = null
									}
								}
								if (xnumber !== '') {
									if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
										xnumber) == '') {

										if (de == 'null') {
											de = ''
										}
										if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
											inp.value = de
										}

									} else {
										inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									};
								} else {
									if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

										if (de == 'null') {
											de = ''
										}
										if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
											inp.value = de
										}

									} else {
										inp.value = savetable[is].nowdata[an].value;
									}
								}
								if (inp.value !== null && inp.value !== '') {
									if (itemformat !== null) {
										inp.value = dateFormat(itemformat, new Date(inp.value))

									}
								}
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') == 'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
									'px';
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].width = inp.style.width + 'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;

								inp.readOnly = true;
								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
								let re = /\bafter\b/;
								if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].className)) {
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.remove("after");
								}

							} else {
								var inp = document.createElement('input');
								if (shi1.indexOf(num) > -1) { } else {
									savetable[is].nowdata.splice(an, 0, {
										value: null
									})
								}
								// var xnumber = '';
								// var de = '';
								// var itemformat = null;
								// inp.id = savetable[is].nowdata[an].id;
								// for (let i1 = 0; i1 < shi5.length; i1++) {
								// 	if (shi5[i1].id == ab) {
								// 		xnumber = shi5[i1].xsnumber;
								// 		de = shi5[i1].defauldisplay;
								// 		break;
								// 	} else {
								// 		xnumber = '';
								// 		de = '';
								// 	}
								// }
								// for (let i1 = 0; i1 < shi6.length; i1++) {
								// 	if (shi6[i1].id == ab) {
								// 		itemformat = shi6[i1].itemformat;
								// 		break
								// 	} else {
								// 		itemformat = null
								// 	}
								// }
								// if (xnumber !== '') {
								// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
								// 			xnumber) == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
								// 	};
								// } else {
								// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

								// 		if (de == 'null') {
								// 			de = ''
								// 		}
								// 		inp.value = de;

								// 	} else {
								// 		inp.value = savetable[is].nowdata[an].value;
								// 	}
								// }
								// if (inp.value !== null && inp.value !== '') {
								// 	if (itemformat !== null) {
								// 		inp.value = dateFormat(itemformat, new Date(inp.value))
								// 		console.log(itemformat)
								// 	}
								// }
								if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') == 'top') {
									inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
									'bottom') {
									inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
								}
								inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
									'px';
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].width = inp.style.width + 'px';
								inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.backgroundColor;
								inp.style.textAlign = ($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
								inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
								inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
								inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
								inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
									.textDecoration;
								inp.id = savetable[is].nowdata[an].id;
								inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
								inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
								inp.readOnly = false;

								inp.classList.add('inp');
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.add('after')
								var div = document.createElement('div');
								div.classList.add('tip')
								div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id)
								var p1 = document.createElement('p');
								// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
								var p2 = document.createElement('p');
								// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
								div.appendChild(p1);
								div.appendChild(p2);
							}
							$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).addClass("daochu");
							num++;
						}
						ab++;
					}

				}

			} else {
				// 横向分布在前

				var shi1 = [];
				if (savetable[is].kzresourcedataitemarray !== []) {
					for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
						var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
						shi1.push(parseInt(shi2[1]))
					}
				}

				var shi3 = [];
				for (let ii = 0; ii < savetable[is].kzresourcedataitemarray.length; ii++) {
					if (savetable[is].kzresourcedataitemarray[ii].itemdata == '序号' || savetable[is].kzresourcedataitemarray[ii].itemdata ==
						'班次' || savetable[is].kzresourcedataitemarray[ii].itemdata == '归档时间') {
						var shi2 = savetable[is].kzresourcedataitemarray[ii].id.split('-');
						shi3.push(parseInt(shi2[1]));

					}
				}

				if (savetable[is].kzsummopos == '分布在前') {

					var reg = new RegExp("^[0-9]*$");
					var ab = 0;
					var ab2 = 0;
					var num = parseInt(savetable[is].startpoy);
					var num1 = savetable[is].startpoy;
					redhead = savetable[is].startpoy;
					var aaa = savetable[is].kzsummotype.split(",").length;
					var y = (parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy)) + 1;
					if (y > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
						y = $("#" + savetable[is].paraname).find('.datareadyhead').length
					}
					var sumdata1 = savetable[is].kzsummotype.split(',');
					var sumnum = $($("#" + savetable[is].paraname).find('.datareadyfoot')[0]).parent().find('.datareadyfoot').length;
					var x = $($("#" + savetable[is].paraname).find('.datareadyfoot')[0]).parent().find('.dataready').length;
					for (var i = 0; i < x; i++) {
						num1 = savetable[is].startpoy;
						for (var v = 0; v < y; v++) {

							$($("#" + savetable[is].paraname).find(`#row-` + num1)[0]).find('.dataready')[ab2].innerHTML = ''
							$($($("#" + savetable[is].paraname).find(`#row-` + num1)[0]).find('.dataready')[ab2]).addClass("del");
							num1++;
						}
						ab2++;
					}
					if (checked == 1) {
						var sumdata = savetable[is].kzsummotype.split(',');
						for (var i = 0; i < x; i++) {
							var num = parseInt(savetable[is].startpoy);
							for (var j = 0; j < y; j++) {
								let an = i * y + j;
								if (parseInt(an) >= savetable[is].nowdata.length) {
									savetable[is].nowdata.push({
										value: null,
										id: null
									})

								}
								if (savetable[is].nowdata[an].modifyname == null) {
									var inp = document.createElement('input');
									if (shi1.indexOf(num) > -1) { } else {
										savetable[is].nowdata.splice(an, 0, {
											value: null
										})
									}
									if (savetable[is].nowdata[an].value == 'null') {
										savetable[is].nowdata[an].value = '';
									}
									var xnumber = '';
									var de = ''
									var itemformat = null;
									inp.id = savetable[is].nowdata[an].id;
									for (let i1 = 0; i1 < shi5.length; i1++) {
										if (shi5[i1].id == num) {
											xnumber = shi5[i1].xsnumber;
											de = shi5[i1].defauldisplay;
											break;
										} else {
											xnumber = '';
											de = '';
										}
									}
									for (let i1 = 0; i1 < shi6.length; i1++) {
										if (shi6[i1].id == num) {
											itemformat = shi6[i1].itemformat;
											break
										} else {
											itemformat = null
										}
									}
									if (xnumber !== '') {
										if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
											xnumber) == '') {

											if (de == 'null') {
												de = ''
											}
											if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
												inp.value = de
											}

										} else {
											inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
										}

									} else {
										if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

											if (de == 'null') {
												de = ''
											}
											if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
												inp.value = de
											}
										} else {
											inp.value = savetable[is].nowdata[an].value;
										}
									}
									if (inp.value !== null && inp.value !== '') {
										if (itemformat !== null) {
											inp.value = dateFormat(itemformat, new Date(inp.value))

										}
									}
									if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'top') {
										inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'bottom') {
										inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									}

									inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
										'px';
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth = inp.style.width +
										'px';
									inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.backgroundColor;
									inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
									inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
									inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
									inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
									inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.textDecoration;
									inp.id = savetable[is].nowdata[an].id;
									inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
									inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
									inp.readOnly = true;
									inp.classList.add('inp');
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
									let re = /\bafter\b/;
									if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].className)) {
										$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.remove("after");
									}
								} else {
									var inp = document.createElement('input');
									if (shi1.indexOf(num) > -1) { } else {
										savetable[is].nowdata.splice(an, 0, {
											value: null
										})
									}
									// var xnumber = '';
									// var de = ''
									// var itemformat = null;
									// inp.id = savetable[is].nowdata[an].id;
									// for (let i1 = 0; i1 < shi5.length; i1++) {
									// 	if (shi5[i1].id == num) {
									// 		xnumber = shi5[i1].xsnumber;
									// 		de = shi5[i1].defauldisplay;
									// 		break;
									// 	} else {
									// 		xnumber = '';
									// 		de = '';
									// 	}
									// }
									// for (let i1 = 0; i1 < shi6.length; i1++) {
									// 										if (shi6[i1].id == num) {
									// 											itemformat = shi6[i1].itemformat;
									// 											break
									// 										}else{
									// 											itemformat = null
									// 										}
									// 								}
									// if (xnumber !== '') {
									// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
									// 			xnumber) == '') {

									// 		if (de == 'null') {
									// 			de = ''
									// 		}
									// 		inp.value = de;

									// 	} else {
									// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									// 	}

									// } else {
									// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

									// 		if (de == 'null') {
									// 			de = ''
									// 		}
									// 		inp.value = de;

									// 	} else {
									// 		inp.value = savetable[is].nowdata[an].value;
									// 	}
									// }
									if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'top') {
										inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'bottom') {
										inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									}
									if (inp.value !== null && inp.value !== '') {
										if (itemformat !== null) {
											inp.value = dateFormat(itemformat, new Date(inp.value))

										}
									}
									inp.readOnly = true;
									inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
										'px';
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].width = inp.style.width +
										'px';
									inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.backgroundColor;
									inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
									inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.textDecoration;
									inp.id = savetable[is].nowdata[an].id;
									inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
									inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
									inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
									inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;

									inp.classList.add('inp');
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.add('after')
									var div = document.createElement('div');
									div.classList.add('tip')
									div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id)
									var p1 = document.createElement('p');
									// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
									var p2 = document.createElement('p');
									// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
									div.appendChild(p1);
									div.appendChild(p2);
								}
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).addClass("daochu");
								num++;
							}
							ab++;

						}
						var s = savetable[is].kzsummotype.split(',')
						var sumdata = s;
						var reg = new RegExp("^[0-9]*$");
						y = parseInt(savetable[is].startpoy) + y;
						for (let j = 0; j < sumdata.length; j++) {
							if (sumdata[j] == 'sum') {
								var num3 = j;
								for (let v1 = parseInt(savetable[is].startpoy); v1 < y; v1++) {
									let aindex;
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var pdz = false
									var hjgpj = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {

										} else {
											hjgpj = hjgpj + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value)
										}

									}
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {
											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = "\\"
												}



											} else {
												for (let ss = 0; ss < shi5.length; ss++) {
													if (shi5[ss].id == v1) {
														hjgpj = getPointNum(hjgpj, shi5[ss].xsnumber);
													}
												}
												if ((v1) !== parseFloat(savetable.startpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = hjgpj
												}
												if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = hjgpj
												}



											}
										}



									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}


								}


							} else if (sumdata[j] == 'mean') {
								var num3 = j;
								for (let v1 = parseInt(savetable[is].startpoy); v1 < y; v1++) {
									var hjgpj = 0;
									var length = 0;
									let aindex;
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var pdz = false
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) { } else {
											hjgpj = hjgpj + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value);
											length++;
										}



									}
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {
											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = "\\"
												}



											} else {
												let hm = hjgpj / length;
												for (let ss = 0; ss < shi5.length; ss++) {
													if (shi5[ss].id == v1) {
														hm = getPointNum(hm, shi5[ss].xsnumber);
													}
												}
												if (isNaN(hm)) {
													hm = 0;
												}
												if ((v1) !== parseFloat(savetable.startpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = hm;
												}
												if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = hm;
												}


											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}


								}


							} else if (sumdata[j] == 'min') {

								var num3 = j;
								for (let v1 = parseInt(savetable[is].startpoy); v1 < y; v1++) {
									var gdata = [];
									var length = 0;
									let aindex;
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var pdz = false
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {


										} else {
											gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))
										}



									}
									gdata.sort(function (a, b) {
										return a - b;
									})

									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {


											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = "\\"
												}



											} else {
												if (gdata[0] == undefined) {

													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = 0;


												} else {
													if ((v1) !== parseFloat(savetable.startpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = gdata[0];
													}
													if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = gdata[0];
													}

												}
											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}



								}

							} else if (sumdata[j] == 'max') {
								var num3 = j;

								for (let v1 = parseInt(savetable[is].startpoy); v1 < y; v1++) {
									let aindex;
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var pdz = false
									var gdata = [];
									var length = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {


										} else {
											gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))
										}



									}
									gdata.sort(function (a, b) {
										return a - b;
									})
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {


											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = "\\"
												}


											} else {
												if (gdata.length - 1 < 0) {
													if (!$($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3]).text()) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = 0;
													}

												} else {
													if ((v1) !== parseFloat(savetable.startpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = gdata[
															gdata.length - 1];
													}
													if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = gdata[
															gdata.length - 1];
													}


												}
											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}




								}
							}
						}
					} else {

						var sumdata = savetable[is].kzsummotype.split(',');
						for (var i = 0; i < x; i++) {
							var num = parseInt(savetable[is].startpoy);
							for (var j = 0; j < y; j++) {
								let an = i * y + j;
								if (parseInt(an) >= savetable[is].nowdata.length) {
									savetable[is].nowdata.push({
										value: null,
										id: null
									})

								}
								if (savetable[is].nowdata[an].value == 'null') {
									savetable[is].nowdata[an].value = '';
								}
								if (savetable[is].nowdata[an].modifyname == null) {
									var inp = document.createElement('input');
									if (shi1.indexOf(num) > -1) { } else {
										savetable[is].nowdata.splice(an, 0, {
											value: null
										})
									}
									var xnumber = '';
									var de = ''
									var itemformat = null;
									inp.id = savetable[is].nowdata[an].id;
									for (let i1 = 0; i1 < shi5.length; i1++) {
										if (shi5[i1].id == num) {
											xnumber = shi5[i1].xsnumber;
											de = shi5[i1].defauldisplay;
											break;
										} else {
											xnumber = '';
											de = '';
										}
									}
									for (let i1 = 0; i1 < shi6.length; i1++) {
										if (shi6[i1].id == num) {
											itemformat = shi6[i1].itemformat;
											break
										} else {
											itemformat = null
										}
									}
									if (xnumber !== '') {
										if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
											xnumber) == '') {

											if (de == 'null') {
												de = ''
											}
											if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
												inp.value = de
											}


										} else {
											inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
										}

									} else {
										if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

											if (de == 'null') {
												de = ''
											}
											if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
												inp.value = de
											}
										} else {
											inp.value = savetable[is].nowdata[an].value;
										}
									}
									if (inp.value !== null && inp.value !== '') {
										if (itemformat !== null) {
											inp.value = dateFormat(itemformat, new Date(inp.value))

										}
									}
									if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'top') {
										inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'bottom') {
										inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									}
									inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
										'px';
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth = inp.style.width +
										'px';
									inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.backgroundColor;
									inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
									inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
									inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.textDecoration;
									inp.id = savetable[is].nowdata[an].id;
									inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
									inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
									inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
									inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
									inp.readOnly = false;
									inp.classList.add('inp');
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
									let re = /\bafter\b/;
									if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].className)) {
										$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.remove("after");
									}
								} else {
									var inp = document.createElement('input');
									if (shi1.indexOf(num) > -1) { } else {
										savetable[is].nowdata.splice(an, 0, {
											value: null
										})
									}
									// var xnumber = '';
									// var de = ''
									// var itemformat = null;
									// inp.id = savetable[is].nowdata[an].id;
									// for (let i1 = 0; i1 < shi5.length; i1++) {
									// 	if (shi5[i1].id == num) {
									// 		xnumber = shi5[i1].xsnumber;
									// 		de = shi5[i1].defauldisplay;
									// 		break;
									// 	} else {
									// 		xnumber = '';
									// 		de = '';
									// 	}
									// }
									// for (let i1 = 0; i1 < shi6.length; i1++) {
									// 										if (shi6[i1].id == num) {
									// 											itemformat = shi6[i1].itemformat;
									// 											break
									// 										}else{
									// 											itemformat = null
									// 										}
									// 								}
									// if (xnumber !== '') {
									// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
									// 			xnumber) == '') {

									// 		if (de == 'null') {
									// 			de = ''
									// 		}
									// 		inp.value = de;

									// 	} else {
									// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									// 	}

									// } else {
									// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

									// 		if (de == 'null') {
									// 			de = ''
									// 		}
									// 		inp.value = de;

									// 	} else {
									// 		inp.value = savetable[is].nowdata[an].value;
									// 	}
									// }
									if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'top') {
										inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'bottom') {
										inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									}
									if (inp.value !== null && inp.value !== '') {
										if (itemformat !== null) {
											inp.value = dateFormat(itemformat, new Date(inp.value))

										}
									}
									inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
										'px';
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].width = inp.style.width +
										'px';
									inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.backgroundColor;
									inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
									inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
									inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.textDecoration;
									inp.id = savetable[is].nowdata[an].id;
									inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
									inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
									inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
									inp.readOnly = false;
									inp.classList.add('inp');
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.add('after')
									var div = document.createElement('div');
									div.classList.add('tip')
									div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id)
									var p1 = document.createElement('p');
									// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
									var p2 = document.createElement('p');
									// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
									div.appendChild(p1);
									div.appendChild(p2);
								}
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).addClass("daochu");
								num++;
							}
							ab++;

						}
						var s = savetable[is].kzsummotype.split(',')
						var sumdata = s;
						var reg = new RegExp("^[0-9]*$");
						y = parseInt(savetable[is].startpoy) + y;
						for (let j = 0; j < sumdata.length; j++) {
							if (sumdata[j] == 'sum') {
								var num3 = j;
								for (let v1 = parseInt(savetable[is].startpoy); v1 < y; v1++) {
									var hjgpj = 0;
									let aindex;
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var pdz = false
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {

										} else {
											hjgpj = hjgpj + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value)
										}

									}
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {
											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = "\\"
												};



											} else {
												for (let ss = 0; ss < shi5.length; ss++) {
													if (shi5[ss].id == v1) {
														hjgpj = getPointNum(hjgpj, shi5[ss].xsnumber);
													}
												}
												if ((v1) !== parseFloat(savetable.startpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = hjgpj
												}
												if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = hjgpj
												}


											}
										}



									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}


								}


							} else if (sumdata[j] == 'mean') {
								var num3 = j;
								for (let v1 = parseInt(savetable[is].startpoy); v1 < y; v1++) {
									var hjgpj = 0;
									let aindex;
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var pdz = false
									var length = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) { } else {
											hjgpj = hjgpj + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value);
											length++;
										}



									}
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {
											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = "\\"
												}



											} else {
												let hm = hjgpj / length;
												for (let ss = 0; ss < shi5.length; ss++) {
													if (shi5[ss].id == v1) {
														hm = getPointNum(hm, shi5[ss].xsnumber);
													}
												}
												if (isNaN(hm)) {
													hm = 0;
												}
												if ((v1) !== parseFloat(savetable.startpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = hm;
												}
												if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = hm;
												}


											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}


								}


							} else if (sumdata[j] == 'min') {

								var num3 = j;
								for (let v1 = parseInt(savetable[is].startpoy); v1 < y; v1++) {
									var gdata = [];
									var length = 0;
									let aindex;
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var pdz = false
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {


										} else {
											gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))
										}



									}
									gdata.sort(function (a, b) {
										return a - b;
									})

									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {


											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = "\\"
												}



											} else {
												if (gdata[0] == undefined) {

													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = 0;


												} else {
													if ((v1) !== parseFloat(savetable.startpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = gdata[0];
													}
													if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = gdata[0];
													}


												}
											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}



								}

							} else if (sumdata[j] == 'max') {
								var num3 = j;
								for (let v1 = parseInt(savetable[is].startpoy); v1 < y; v1++) {
									var gdata = [];
									var length = 0;
									let aindex;
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var pdz = false
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {


										} else {
											gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))
										}



									}
									gdata.sort(function (a, b) {
										return a - b;
									})
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {


											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = "\\"
												};



											} else {
												if (gdata.length - 1 < 0) {

													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = 0;



												} else {
													if ((v1) !== parseFloat(savetable.startpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = gdata[
															gdata.length - 1];
													}
													if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[num3].innerHTML = gdata[
															gdata.length - 1];
													}

												}
											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}




								}
							}
						}
					}
				} else {

					// 横向分布在后
					var ab = 0;
					var ab2 = 0;
					var num = parseInt(savetable[is].startpoy);
					var num1 = savetable[is].startpoy;
					redhead = savetable[is].startpoy;
					var y = (parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy)) + 1;
					if (y > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
						y = $("#" + savetable[is].paraname).find('.datareadyhead').length
					}
					var sumnum = $($("#" + savetable[is].paraname).find('.datareadyfoot')[0]).parent().find('.datareadyfoot').length;
					var x = $($("#" + savetable[is].paraname).find('.datareadyfoot')[0]).parent().find('.dataready').length;
					var s1 = savetable[is].kzsummotype.split(',')
					var sumdata1 = s1;
					var x = parseInt(savetable[is].endpox) - parseInt(savetable[is].startpox) - sumdata1.length;
					for (var i = 0; i < x; i++) {
						num1 = savetable[is].startpoy;
						for (var v = 0; v < y; v++) {
							$($("#" + savetable[is].paraname).find(`#row-` + num1)[0]).find('.dataready')[ab2].innerHTML = ''
							$($($("#" + savetable[is].paraname).find(`#row-` + num1)[0]).find('.dataready')[ab2]).addClass("del");
							num1++;
						}

						ab2++;


					}
					if (checked == 1) {

						var y = (parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy)) + 1;
						if (y > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
							y = $("#" + savetable[is].paraname).find('.datareadyhead').length
						}
						for (var i = 0; i < x; i++) {
							var num = parseInt(savetable[is].startpoy);
							for (var j = 0; j < y; j++) {
								let an = i * y + j;
								if (parseInt(an) >= savetable[is].nowdata.length) {
									savetable[is].nowdata.push({
										value: null,
										id: null
									})
								}
								if (savetable[is].nowdata[an].value == 'null') {
									savetable[is].nowdata[an].value = '';
								}
								if (savetable[is].nowdata[an].modifyname == null) {
									var inp = document.createElement('input');
									if (shi1.indexOf(num) > -1) { } else {
										savetable[is].nowdata.splice(an, 0, {
											value: null
										})
									}
									var xnumber = '';
									var de = ''
									var itemformat = null;
									// console.log(data)
									// inp.id = data[an].id;
									for (let i1 = 0; i1 < shi5.length; i1++) {
										if (shi5[i1].id == num) {
											xnumber = shi5[i1].xsnumber;
											de = shi5[i1].defauldisplay;
											break;
										} else {
											xnumber = '';
											de = '';
										}
									}
									for (let i1 = 0; i1 < shi6.length; i1++) {
										if (shi6[i1].id == num) {
											itemformat = shi6[i1].itemformat;
											break
										} else {
											itemformat = null
										}
									}

									if (xnumber !== '') {
										if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
											xnumber) == '') {

											if (de == 'null') {
												de = ''
											}

											if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
												inp.value = de
											}

										} else {
											inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
										}

									} else {
										if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

											if (de == 'null') {
												de = ''
											}

											if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
												inp.value = de
											}
										} else {
											inp.value = savetable[is].nowdata[an].value;
										}
									}
									if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'top') {
										inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'bottom') {
										inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									}
									if (inp.value !== null && inp.value !== '') {
										if (itemformat !== null) {
											inp.value = dateFormat(itemformat, new Date(inp.value))

										}
									}
									inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
										'px';
									inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.backgroundColor;
									inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
									inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.textDecoration;
									inp.id = savetable[is].nowdata[an].id;
									inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
									inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
									inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
									inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
									inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
									// inp.disabled = true;
									inp.readOnly = true;
									inp.id = savetable[is].nowdata[an].id;
									inp.classList.add('inp');

									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
									let re = /\bafter\b/;
									if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].className)) {
										$($("#" + savetable[is].paraname).find(`#row-` + num)[0])[ab].classList.remove("after");
									}


								} else {
									var inp = document.createElement('input');
									if (shi1.indexOf(num) > -1) { } else {
										savetable[is].nowdata.splice(an, 0, {
											value: null
										})
									}
									// var xnumber = '';
									// var de = '';
									// var itemformat = null;
									// inp.id = savetable[is].nowdata[an].id;
									// for (let i1 = 0; i1 < shi5.length; i1++) {
									// 	if (shi5[i1].id == num) {
									// 		xnumber = shi5[i1].xsnumber;
									// 		de = shi5[i1].defauldisplay;
									// 		break;
									// 	} else {
									// 		xnumber = '';
									// 		de = '';
									// 	}
									// }
									// for (let i1 = 0; i1 < shi6.length; i1++) {
									// 										if (shi6[i1].id == num) {
									// 											itemformat = shi6[i1].itemformat;
									// 											break
									// 										}else{
									// 											itemformat = null
									// 										}
									// 								}
									// if (xnumber !== '') {
									// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
									// 			xnumber) == '') {

									// 		if (de == 'null') {
									// 			de = ''
									// 		}
									// 		inp.value = de;

									// 	} else {
									// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									// 	}

									// } else {
									// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {

									// 		if (de == 'null') {
									// 			de = ''
									// 		}
									// 		inp.value = de;

									// 	} else {
									// 		inp.value = savetable[is].nowdata[an].value;
									// 	}
									// }
									if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'top') {
										inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'bottom') {
										inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'
									}
									if (inp.value !== null && inp.value !== '') {
										if (itemformat !== null) {
											inp.value = dateFormat(itemformat, new Date(inp.value))

										}
									}

									inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
										'px';
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].width = inp.style.width +
										'px';
									inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.backgroundColor;
									inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
									inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
									inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.textDecoration;
									inp.id = savetable[is].nowdata[an].id;
									inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
									inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
									inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
									inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;
									inp.id = savetable[is].nowdata[an].id;
									inp.readOnly = true;
									inp.classList.add('inp');
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.add('after')
									var div = document.createElement('div');
									div.classList.add('tip')
									div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id)
									var p1 = document.createElement('p');
									// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
									var p2 = document.createElement('p');
									// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
									div.appendChild(p1);
									div.appendChild(p2);

								}
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).addClass("daochu");
								num++;
							}
							ab++;

						}
						var s = savetable[is].kzsummotype.split(',')
						var sumdata = s;

						var reg = new RegExp("^[0-9]*$");
						for (let j = 0; j < sumnum; j++) {

							if (sumdata[j] == 'sum') {

								for (let v1 = parseInt(savetable[is].startpoy); v1 < (y + parseInt(savetable[is].startpoy)); v1++) {
									let aindex;
									var pdz = false
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var hjgpj = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {

										} else {

											hjgpj = hjgpj + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value)
										}

									}

									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {


										if (result == true) {

											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
												};



											} else {

												for (let ss = 0; ss < shi5.length; ss++) {
													if (shi5[ss].id == v1) {
														hjgpj = getPointNum(hjgpj, shi5[ss].xsnumber);
													}
												}
												if ((v1) !== parseFloat(savetable.startpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = hjgpj;
												}
												if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = hjgpj;
												}


											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}


								}


							} else if (sumdata[j] == 'mean') {
								for (let v1 = parseInt(savetable[is].startpoy); v1 < (y + parseInt(savetable[is].startpoy)); v1++) {
									let aindex;
									var pdz = false
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var hjgpj = 0;
									var length = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {


										} else {
											hjgpj = hjgpj + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value)
											length++;
										}
									}
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {
											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
												};


											} else {
												let dm = hjgpj / length;
												for (let ss = 0; ss < shi5.length; ss++) {
													if (shi5[ss].id == v1) {
														dm = getPointNum(dm, shi5[ss].xsnumber);
													}
												}

												if (isNaN(dm)) {
													dm = 0
												}
												if ((v1) !== parseFloat(savetable.startpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = dm;
												}
												if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = dm;
												}


											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}


								}


							} else if (sumdata[j] == 'min') {
								for (let v1 = parseInt(savetable[is].startpoy); v1 < (y + parseInt(savetable[is].startpoy)); v1++) {
									let aindex;
									var pdz = false
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var gdata = [];
									var length = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) { } else {
											gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))
										}
									}
									gdata.sort(function (a, b) {
										return a - b;
									})
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {
											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
												};


											} else {

												if (gdata.length - 1 < 0) {

													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = 0;


												} else {
													if ((v1) !== parseFloat(savetable.startpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = gdata[0];
													}
													if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = gdata[0];
													}


												}
											}
										}



									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}
								}

							} else if (sumdata[j] == 'max') {
								for (let v1 = parseInt(savetable[is].startpoy); v1 < (y + parseInt(savetable[is].startpoy)); v1++) {
									let aindex;
									var pdz = false
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var gdata = [];
									var length = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) { } else {
											gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))
										}
									}
									gdata.sort(function (a, b) {
										return a - b;
									})
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {
											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
												};


											} else {

												if (gdata.length - 1 < 0) {

													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = 0;


												} else {
													if ((v1) !== parseFloat(savetable.startpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = gdata[gdata
															.length -
															1];
													}
													if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = gdata[gdata
															.length -
															1];
													}


												}
											}
										}



									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}
								}
							}
						}


					} else {

						var y = (parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy)) + 1;
						if (y > $("#" + savetable[is].paraname).find('.datareadyhead').length) {
							y = $("#" + savetable[is].paraname).find('.datareadyhead').length
						}
						for (var i = 0; i < x; i++) {
							var num = parseInt(savetable[is].startpoy);
							for (var j = 0; j < y; j++) {
								let an = i * y + j;

								if (parseInt(an) >= savetable[is].nowdata.length) {
									savetable[is].nowdata.push({
										value: null,
										id: null
									})

								}
								if (savetable[is].nowdata[an].value == 'null') {
									savetable[is].nowdata[an].value = '';
								}
								if (savetable[is].nowdata[an].modifyname == null) {
									var inp = document.createElement('input');
									if (shi1.indexOf(num) > -1) {
										// console.log("ab",ab)
									} else {
										savetable[is].nowdata.splice(an, 0, {
											value: null
										})
									}
									var xnumber = '';
									var de = ''
									var itemformat = null;
									inp.id = savetable[is].nowdata[an].id;
									for (let i1 = 0; i1 < shi5.length; i1++) {
										if (shi5[i1].id == num) {
											xnumber = shi5[i1].xsnumber;
											de = shi5[i1].defauldisplay;
											break;
										} else {
											xnumber = '';
											de = '';
										}
									}
									for (let i1 = 0; i1 < shi6.length; i1++) {
										if (shi6[i1].id == num) {
											itemformat = shi6[i1].itemformat;
											break
										} else {
											itemformat = null
										}
									}
									if (xnumber !== '') {
										if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
											xnumber) == '') {
											if (de !== '' && inp.id !== "undefined") {
												if (de == 'null') {
													de = ''
												}
												if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
													inp.value = de
												}
											} else {
												inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber)
											}
										} else {
											inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
										}

									} else {
										if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {
											if (de !== '' && inp.id !== "undefined") {
												if (de == 'null') {
													de = ''
												}
												if ($($($($("#" + savetable[is].paraname).find(`#row-` + parseInt(savetable[is].startpoy))[0]).find('.dataready')[ab]).find('input')[0]).val()) {
													inp.value = de
												}
											} else {
												inp.value = savetable[is].nowdata[an].value
											}
										} else {
											inp.value = savetable[is].nowdata[an].value;
										}
									}
									if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'top') {
										inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'bottom') {
										inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									}
									if (inp.value !== null && inp.value !== '') {
										if (itemformat !== null) {
											inp.value = dateFormat(itemformat, new Date(inp.value))

										}
									}
									inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
										'px';
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].width = inp.style.width +
										'px';
									inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.backgroundColor;
									inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
									inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
									inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.textDecoration;
									inp.id = savetable[is].nowdata[an].id;
									inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
									inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
									inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
									inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;

									inp.classList.add('inp');
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
									let re = /\bafter\b/;
									if (re.test($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].className)) {
										$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.remove("after");
									}

								} else {
									var inp = document.createElement('input');
									if (shi1.indexOf(num) > -1) {
										// console.log("ab",ab)
									} else {
										savetable[is].nowdata.splice(an, 0, {
											value: null
										})
									}
									// var xnumber = '';
									// var de = ''
									// var itemformat = null;
									// inp.id = savetable[is].nowdata[an].id;
									// for (let i1 = 0; i1 < shi5.length; i1++) {
									// 	if (shi5[i1].id == num) {
									// 		xnumber = shi5[i1].xsnumber;
									// 		de = shi5[i1].defauldisplay;
									// 		break;
									// 	} else {
									// 		xnumber = '';
									// 		de = '';
									// 	}
									// }
									// for (let i1 = 0; i1 < shi6.length; i1++) {
									// 										if (shi6[i1].id == num) {
									// 											itemformat = shi6[i1].itemformat;
									// 											break
									// 										}else{
									// 											itemformat = null
									// 										}
									// 								}
									// if (xnumber !== '') {
									// 	if (getPointNum(savetable[is].nowdata[an].value, xnumber) == null || getPointNum(savetable[is].nowdata[an].value,
									// 			xnumber) == '') {
									// 		if (de !== '' && inp.id !== "undefined") {
									// 			if (de == 'null') {
									// 				de = ''
									// 			}
									// 			inp.value = de;
									// 		} else {
									// 			inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber)
									// 		}
									// 	} else {
									// 		inp.value = getPointNum(savetable[is].nowdata[an].value, xnumber);
									// 	}

									// } else {
									// 	if (savetable[is].nowdata[an].value == null || savetable[is].nowdata[an].value == '') {
									// 		if (de !== '' && inp.id !== "undefined") {
									// 			if (de == 'null') {
									// 				de = ''
									// 			}
									// 			inp.value = de;
									// 		} else {
									// 			inp.value = savetable[is].nowdata[an].value
									// 		}
									// 	} else {
									// 		inp.value = savetable[is].nowdata[an].value;
									// 	}
									// }
									if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'top') {
										inp.style.top = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									} else if ($($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab]).attr('valign') ==
										'bottom') {
										inp.style.bottom = -($($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientHeight / 2) + 'px'

									}
									if (inp.value !== null && inp.value !== '') {
										if (itemformat !== null) {
											inp.value = dateFormat(itemformat, new Date(inp.value))

										}
									}
									inp.style.width = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].clientWidth +
										'px';
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].width = inp.style.width +
										'px';
									inp.style.backgroundColor = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.backgroundColor;
									inp.style.textAlign = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].align;
									inp.style.color = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.color;
									inp.style.textDecoration = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style
										.textDecoration;
									inp.id = savetable[is].nowdata[an].id;
									inp.style.fontFamily = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontFamily;
									inp.style.fontSize = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontSize;
									inp.style.fontStyle = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontStyle;
									inp.style.fontWeight = $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].style.fontWeight;

									inp.classList.add('inp');
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].appendChild(inp)
									$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].classList.add('after')
									var div = document.createElement('div');
									div.classList.add('tip')
									div.setAttribute("id", "r" + $($("#" + savetable[is].paraname).find(`#row-` + num)[0]).find('.dataready')[ab].id)
									var p1 = document.createElement('p');
									// p1.innerHTML = "修改人:" + savetable[is].nowdata[an].modifyname;
									var p2 = document.createElement('p');
									// p2.innerHTML = "修改时间:" + savetable[is].nowdata[an].modifytime;
									div.appendChild(p1);
									div.appendChild(p2);
								}
								$($("#" + savetable[is].paraname).find(`#row-` + num)[0]).addClass("daochu");
								num++;
							}
							ab++;
						}
						var s = savetable[is].kzsummotype.split(',')
						var sumdata = s;
						var reg = new RegExp("^[0-9]*$");
						for (let j = 0; j < sumnum; j++) {
							if (sumdata[j] == 'sum') {
								for (let v1 = parseInt(savetable[is].startpoy); v1 < (y + parseInt(savetable[is].startpoy)); v1++) {
									let aindex;
									var pdz = false
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var hjgpj = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {

										} else {
											hjgpj = hjgpj + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value)
										}

									}
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {

											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
												};


											} else {

												for (let ss = 0; ss < shi5.length; ss++) {
													if (shi5[ss].id == v1) {
														hjgpj = getPointNum(hjgpj, shi5[ss].xsnumber);
													}
												}
												if ((v1) !== parseFloat(savetable.startpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = hjgpj;
												}
												if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = hjgpj;
												}


											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}


								}


							} else if (sumdata[j] == 'mean') {
								for (let v1 = parseInt(savetable[is].startpoy); v1 < (y + parseInt(savetable[is].startpoy)); v1++) {
									let aindex;
									var pdz = false
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var hjgpj = 0;
									var length = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {


										} else {
											hjgpj = hjgpj + parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value)
											length++;
										}
									}
									if (shi3.indexOf(v1) > -1) {

										$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;



									} else {

										if (result == true) {
											if (pdz) {

												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";



											} else {
												let dm = hjgpj / length;
												for (let ss = 0; ss < shi5.length; ss++) {
													if (shi5[ss].id == v1) {
														dm = getPointNum(dm, shi5[ss].xsnumber);
													}
												}

												if (isNaN(dm)) {
													dm = 0
												}
												if ((v1) !== parseFloat(savetable.startpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = dm;
												}
												if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = dm;
												}


											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}


								}


							} else if (sumdata[j] == 'min') {
								var num3 = parseInt(savetable[is].startpoy) + j - 1;
								for (let v1 = parseInt(savetable[is].startpoy); v1 < (y + parseInt(savetable[is].startpoy)); v1++) {
									let aindex;
									var pdz = false
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var gdata = [];
									var length = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) {



										} else {
											gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))
										}



									}
									gdata.sort(function (a, b) {
										return a - b;
									})

									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {

										if (result == true) {
											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
												};



											} else {

												if (gdata.length == 0) {

													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = 0;


												} else {
													if ((v1) !== parseFloat(savetable.startpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = gdata[0]
													}
													if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = gdata[0]
													}


												}
											}
										}


									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}
								}

							} else if (sumdata[j] == 'max') {
								for (let v1 = parseInt(savetable[is].startpoy); v1 < (y + parseInt(savetable[is].startpoy)); v1++) {
									let aindex;
									var pdz = false
									let result = shi5.some(function (item, index) {
										if (item.id == v1) {
											aindex = index;
											return true;

										}
									})
									var gdata = [];
									var length = 0;
									for (let v = 0; v < x; v++) {
										if (aindex !== undefined) {
											if (isNaN($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) && shi5[aindex].defauldisplay !==
												$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value) {
												pdz = true
											}
										}
										if ($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].id == "undefined" || isNaN(
											parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))) { } else {
											gdata.push(parseFloat($($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.inp')[v].value))
										}
									}
									gdata.sort(function (a, b) {
										return a - b;
									})
									if (shi3.indexOf(v1) > -1) {

										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
										};



									} else {
										let aindex;
										let result = shi5.some(function (item, index) {
											if (item.id == v1) {
												aindex = index;
												return true;

											}
										})
										if (result == true) {
											if (pdz) {

												if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = "\\";
												};



											} else {

												if (gdata.length - 1 < 0) {

													$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = 0;


												} else {
													if ((v1) !== parseFloat(savetable.startpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = gdata[gdata
															.length -
															1];
													}
													if (parseFloat(savetable.startpoy) == parseFloat(savetable.endpoy)) {
														$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = gdata[gdata
															.length -
															1];
													}


												}
											}
										}



									}
									if (shi1.indexOf(v1) > -1) {

									} else {
										if ((v1) !== parseFloat(savetable[is].startpoy) && parseFloat(savetable[is].startpoy) !== parseFloat(savetable[is].endpoy)) {
											$($("#" + savetable[is].paraname).find(`#row-` + v1)[0]).find('.datareadyfoot')[j].innerHTML = null;
										}

									}
								}
							}
						}
					}
				}

			}
		}
		// var endwidth = parseInt(savetable[is].startpox) * 50;
		// var endwidth2 = parseInt(savetable[is].startpox) * 50;
		// var endheight = parseInt(savetable[is].startpoy) * 30;
		// var endheight2 = parseInt(savetable[is].startpoy) * 30;
		var endwidth = 0;
		var endwidth2 = 0;
		var endheight = 0;
		var endheight2 = 0;
		for (
			let h = 0; h < savetable[is].startpoy; h++
		) {

			endheight += parseFloat($($("#" + savetable[is].paraname).find('#row-' + h))[0].clientHeight);
			endheight2 += parseFloat($($("#" + savetable[is].paraname).find('#row-' + h))[0].clientHeight);
		}
		endheight += 1;
		endheight2 += 1;
		var aaa = savetable[is].kzsummotype.split(",");

		var bbb;
		if (aaa[0] == "") {
			bbb = 1;
		} else {
			bbb = aaa.length + 1;
		}
		if ($("#" + savetable[is].paraname + "page")[0]) {
			if (savetable[is].kzdirection == '纵向扩展' && savetable[is].tabledata.length !== 0) {


				let n = parseInt(savetable[is].startpox) + 1
				for (let j1 = 0; j1 < n; j1++) {

					endwidth += $($("#" + savetable[is].paraname).find("#row-" + savetable[is].startpoy)).find('td')[j1].clientWidth;
				}
				for (var jj = 0; jj < $("#" + savetable[is].paraname).find('.datareadyhead').length; jj++) {

					endwidth = endwidth + parseInt($($("#" + savetable[is].paraname).find("#row-" + savetable[is].startpoy)).find(
						'.datareadyhead')[jj].clientWidth);
				}
				var nownum = parseInt(savetable[is].startpoy)
				let zy = parseInt(savetable[is].endpoy) - parseInt(savetable[is].startpoy) + bbb;

				if (zy > $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy)) {

					zy = $("#" + savetable[is].paraname).find('tr').length - parseInt(savetable[is].startpoy)
				}
				for (var jj = 0; jj < zy; jj++) {

					endheight = endheight + parseInt($($("#" + savetable[is].paraname).find("#row-" + nownum))[0].clientHeight);
					nownum++;
				}
				if (savetable[is].kzsummopos == '分布在后') {

					$("#" + savetable[is].paraname + "page")[0].style.top = endheight + parseFloat(savetable[is].top) + 1 + "px";
					if (endwidth - $("#" + savetable[is].paraname + "page")[0].clientWidth +
						parseFloat(savetable[is]
							.left) <= 0) {
						$("#" + savetable[is].paraname + "page")[0].style.left = 0 + 'px'
					} else {
						$("#" + savetable[is].paraname + "page")[0].style.left = endwidth - $("#" + savetable[is].paraname + "page")[0].clientWidth +
							parseFloat(savetable[is]
								.left) + "px";
					}

				} else if (savetable[is].kzsummopos == '分布在前') {
					$("#" + savetable[is].paraname + "page")[0].style.top = endheight + parseFloat(savetable[is].top) + 1 + "px";
					if (endwidth - $("#" + savetable[is].paraname + "page")[0].clientWidth +
						parseFloat(savetable[is]
							.left) <= 0) {
						$("#" + savetable[is].paraname + "page")[0].style.left = 0 + "px";
					} else {
						$("#" + savetable[is].paraname + "page")[0].style.left = endwidth - $("#" + savetable[is].paraname + "page")[0].clientWidth +
							parseFloat(savetable[is]
								.left) + "px";
					}

				} else {

					$("#" + savetable[is].paraname + "page")[0].style.top = endheight + parseFloat(savetable[is].top) + 1 + "px";
					if (endwidth - $("#" + savetable[is].paraname + "page")[0].clientWidth +
						parseFloat(savetable[is]
							.left) <= 0) {
						$("#" + savetable[is].paraname + "page")[0].style.left = 0 + "px";
					} else {
						$("#" + savetable[is].paraname + "page")[0].style.left = endwidth - $("#" + savetable[is].paraname + "page")[0].clientWidth +
							parseFloat(savetable[is]
								.left) + "px";
					}


				}
			} else if (savetable[is].kzdirection == '横向扩展' && savetable[is].tabledata.length !== 0) {

				// let avc = $($('#' + savetable[is].paraname).find('.datareadyfoot')[$('#' + savetable[is].paraname).find('.datareadyfoot').length-1]).attr('id').split('-')[0]

				if ($($('#' + savetable[is].paraname).find('tr')[savetable[is].startpoy]).find('td').length - 2 < savetable[is].endpox) {
					bbb = bbb - (savetable[is].endpox - ($($('#' + savetable[is].paraname).find('tr')[savetable[is].startpoy]).find('td').length - 2))
				}
				let n = parseInt(savetable[is].startpox) + 1
				console.log(n)
				for (let j1 = 0; j1 < n; j1++) {
					if ($($($("#" + savetable[is].paraname).find("#row-" + parseInt(savetable[is].startpoy)))[0]).find('td')[j1]) {

						endwidth2 += parseFloat($($($("#" + savetable[is].paraname).find("#row-" + parseInt(savetable[is].startpoy)))[0]).find('td')[j1].clientWidth);

					}


				}

				for (var ii = 0; ii < $("#" + savetable[is].paraname).find('.datareadyhead').eq(0).parent().find('.dataready').length; ii++) {

					endwidth2 = endwidth2 + parseInt($("#" + savetable[is].paraname).find('.datareadyhead').eq(0).parent().find(
						'.dataready')[ii].clientWidth);
				}

				for (var ii = 0; ii < $("#" + savetable[is].paraname).find('.datareadyhead').eq(0).parent().find('.datareadyhead').length; ii++) {
					endwidth2 = endwidth2 + parseInt($("#" + savetable[is].paraname).find('.datareadyhead').eq(0).parent().find(
						'.datareadyhead')[ii].clientWidth);
					console.log($("#" + savetable[is].paraname).find('.datareadyhead').eq(0).parent().find(
						'.datareadyhead')[ii])
				}

				if (aaa[0] !== '') {
					for (var ii = 0; ii < bbb - 1; ii++) {
						endwidth2 = endwidth2 + parseInt($("#" + savetable[is].paraname).find('.datareadyhead').eq(0).parent().find(
							'.datareadyfoot')[ii].clientWidth);

					}
				}
				var nownum = parseInt(savetable[is].startpoy)
				for (var jj = 0; jj < $($("#" + savetable[is].paraname).find(".daochu")).length; jj++) {
					endheight2 = endheight2 + parseInt($($("#" + savetable[is].paraname).find(".daochu"))[jj].clientHeight);
					nownum++;
				}

				if (savetable[is].kzsummopos == '分布在后') {
					$("#" + savetable[is].paraname + "page")[0].style.top = endheight2 + parseFloat(savetable[is].top) + 1 + "px";
					if (endwidth2 - $("#" + savetable[is].paraname + "page")[0].clientWidth +
						parseFloat(savetable[is]
							.left) <= 0) {
						$("#" + savetable[is].paraname + "page")[0].style.left = 0 + "px";

					} else {
						$("#" + savetable[is].paraname + "page")[0].style.left = endwidth2 - $("#" + savetable[is].paraname + "page")[0].clientWidth +
							parseFloat(savetable[is]
								.left) + "px";
					}


				} else if (savetable[is].kzsummopos == '分布在前') {
					$("#" + savetable[is].paraname + "page")[0].style.top = endheight2 + parseFloat(savetable[is].top) + 1 + "px";
					if (endwidth2 - $("#" + savetable[is].paraname + "page")[0].clientWidth +
						parseFloat(savetable[is]
							.left) <= 0) {
						$("#" + savetable[is].paraname + "page")[0].style.left = 0 + "px";
					} else {
						$("#" + savetable[is].paraname + "page")[0].style.left = endwidth2 - $("#" + savetable[is].paraname + "page")[0].clientWidth +
							parseFloat(savetable[is]
								.left) + "px";
					}


				} else {
					if (endwidth2 - $("#" + savetable[is].paraname + "page")[0].clientWidth +
						parseFloat(savetable[is]
							.left) <= 0) {
						$("#" + savetable[is].paraname + "page")[0].style.left = 0 + "px";
					} else {
						$("#" + savetable[is].paraname + "page")[0].style.left = endwidth2 - $("#" + savetable[is].paraname + "page")[0].clientWidth +
							parseFloat(savetable[is]
								.left) + "px";
					}
					$("#" + savetable[is].paraname + "page")[0].style.top = endheight2 + parseFloat(savetable[is].top) + 1 + "px";


				}

			}
		}


		$("#" + savetable[is].paraname).find('table')[0].classList.add(savetable[is].paraname);
		if (pddaochu == 1) {
			savetable[is].daochudata = $("#" + savetable[is].paraname).find('table')[0].cloneNode(true);
		}

		if (savetable[is].tabledata.length !== 0 && $("#" + savetable[is].paraname + "page")[0]) {

			$("#" + savetable[is].paraname + "page").find('.last')[0].onclick = function () {
				let reg1 = new RegExp("page", "g");
				let wantid = $(this).parent().parent()[0].id.replace(reg1, "");
				for (let i = 0; i < savetable.length; i++) {
					if (savetable[i].paraname == wantid) {

						if (parseInt($("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value) < savetable[i].daochuend && !isNaN($("#" +
							$(this).parent().parent()[0].id).find('.numinp')[0].value)) {

							if (parseInt($("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value) >= 1) {

								if (typeof (savetable[i].tabledata) == 'string') {
									var a = savetable[i].tabledata;
								} else {
									var a = JSON.stringify(savetable[i].tabledata);
								}
								let f = JSON.parse(a);
								$("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value++;
								let b = $("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value - 1;
								var shi4 = [];
								if (savetable[i].kzresourcedataitemarray !== '') {
									for (let ii = 0; ii < savetable[i].kzresourcedataitemarray.length; ii++) {
										var shi2 = savetable[i].kzresourcedataitemarray[ii].id.split('-');
										shi4.push(parseInt(shi2[0]) - parseInt(savetable[i].startpox))
									}
								}
								savetable[i].nowdata = f.splice(b * savetable[i].nowend, savetable[i].nowend);

								setbodydata(2);

								record();
								break;
							}
						}

					}
				}

			}
			$("#" + savetable[is].paraname + "page").find('.next')[0].onclick = function () {
				let reg1 = new RegExp("page", "g");
				let wantid = $(this).parent().parent()[0].id.replace(reg1, "");
				for (let i = 0; i < savetable.length; i++) {
					if (savetable[i].paraname == wantid) {
						if (parseInt($("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value) > 1 && !isNaN($("#" + $(this).parent().parent()[
							0].id).find('.numinp')[0].value)) {
							if (parseInt($("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value) >= 1) {
								if (typeof (savetable[i].tabledata) == 'string') {
									var a = savetable[i].tabledata;
								} else {
									var a = JSON.stringify(savetable[i].tabledata);
								}


								let f = JSON.parse(a);
								$("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value--;
								let b = $("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value - 1;
								var shi4 = [];
								if (savetable[i].kzresourcedataitemarray !== '') {
									for (let ii = 0; ii < savetable[i].kzresourcedataitemarray.length; ii++) {
										var shi2 = savetable[i].kzresourcedataitemarray[ii].id.split('-');
										shi4.push(parseInt(shi2[0]) - parseInt(savetable[i].startpox))
									}
								}

								savetable[i].nowdata = f.splice(b * savetable[i].nowend, savetable[i].nowend);
								// savetable[i].nowdata = f.splice(b * (savetable[i].nowdata.length), savetable[i].nowdata.length);

								setbodydata(2);
								record();
								break;
							}
						}

					}
				}

			}
			$("#" + savetable[is].paraname + "page").find('.end')[0].onclick = function () {
				let reg1 = new RegExp("page", "g");
				let wantid = $(this).parent().parent()[0].id.replace(reg1, "");
				for (let i = 0; i < savetable.length; i++) {
					if (savetable[i].paraname == wantid) {
						$("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value = savetable[is].daochuend;
						if (typeof (savetable[i].tabledata) == 'string') {
							var a = savetable[i].tabledata;
						} else {
							var a = JSON.stringify(savetable[i].tabledata);
						}
						let f = JSON.parse(a);
						let b = parseInt($("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value) - 1;
						var shi4 = [];
						if (savetable[i].kzresourcedataitemarray !== '') {
							for (let ii = 0; ii < savetable[i].kzresourcedataitemarray.length; ii++) {
								var shi2 = savetable[i].kzresourcedataitemarray[ii].id.split('-');
								shi4.push(parseInt(shi2[0]) - parseInt(savetable[i].startpox))
							}
						}
						savetable[i].nowdata = f.splice(b * savetable[i].nowend, savetable[i].nowend);
						// savetable[i].nowdata = f.splice(b * (savetable[i].nowdata.length), savetable[i].nowdata.length);
						setbodydata(2);
						record();
						break;
					}
				}
			}
			$("#" + savetable[is].paraname + "page").find('.start')[0].onclick = function () {
				let reg1 = new RegExp("page", "g");
				let wantid = $(this).parent().parent()[0].id.replace(reg1, "");
				for (let i = 0; i < savetable.length; i++) {
					if (savetable[i].paraname == wantid) {
						$("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value = 1;
						if (typeof (savetable[i].tabledata) == 'string') {
							var a = savetable[i].tabledata;
						} else {
							var a = JSON.stringify(savetable[i].tabledata);
						}
						let f = JSON.parse(a);
						let b = parseInt($("#" + $(this).parent().parent()[0].id).find('.numinp')[0].value) - 1;
						var shi4 = [];
						if (savetable[i].kzresourcedataitemarray !== '') {
							for (let ii = 0; ii < savetable[i].kzresourcedataitemarray.length; ii++) {
								var shi2 = savetable[i].kzresourcedataitemarray[ii].id.split('-');
								shi4.push(parseInt(shi2[0]) - parseInt(savetable[i].startpox))
							}
						}
						savetable[i].nowdata = f.splice(b * savetable[i].nowend, savetable[i].nowend);
						// savetable[i].nowdata = f.splice(b * (savetable[i].nowdata.length), savetable[i].nowdata.length);

						setbodydata(2);
						record();
						break;
					}
				}
			}
			$("#" + savetable[is].paraname + "page").find(".numinp")[0].onblur = function () {

				let reg1 = new RegExp("page", "g");
				let wantid = $(this).parent().parent().parent()[0].id.replace(reg1, "");
				for (let i = 0; i < savetable.length; i++) {
					if (savetable[i].paraname == wantid) {

						if (1 <= parseInt($("#" + savetable[is].paraname + "page").find(".numinp")[0].value) <= savetable[i].daochuend) {
							if (typeof (savetable[i].tabledata) == 'string') {
								var a = savetable[i].tabledata;
							} else {
								var a = JSON.stringify(savetable[i].tabledata);
							}
							console.log($("#" + $(this).parent().parent()[0].id).find('.numinp')[0])
							let f = JSON.parse(a);
							let b = parseInt($("#" + savetable[is].paraname + "page").find(".numinp")[0].value) - 1;
							var shi4 = [];
							if (savetable[i].kzresourcedataitemarray !== '') {
								for (let ii = 0; ii < savetable[i].kzresourcedataitemarray.length; ii++) {
									var shi2 = savetable[i].kzresourcedataitemarray[ii].id.split('-');
									shi4.push(parseInt(shi2[0]) - parseInt(savetable[i].startpox))
								}
							}
							savetable[i].nowdata = f.splice(b * savetable[i].nowend, savetable[i].nowend);
							// savetable[i].nowdata = f.splice(b * (savetable[i].nowdata.length), savetable[i].nowdata.length);
							setbodydata(2);
							record();
							break;

						}
					}
				}
				document.onkeydown = function (e) { // 回车提交表单
					// 兼容FF和IE和Opera
					var theEvent = window.event || e;
					var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
					if (code == 13) {
						if (e.path[0].className == 'numinp') {
							e.path[0].onblur()
						}

						// for (let i = 0; i < savetable.length; i++) {
						// 	$("#" + savetable[is].paraname + "page").find(".numinp")[0].onblur()
						// if (1 <= parseInt($("#" + savetable[i].paraname + "page").find(".numinp")[0].value) <= savetable[i].daochuend) {

						// 	if(typeof(savetable[i].tabledata)=='string'){
						// 		var a = savetable[i].tabledata;
						// 	}else{
						// 		var a = JSON.stringify(savetable[i].tabledata);
						// 	}
						// 	let f = JSON.parse(a);
						// 	let b = parseInt($("#" + savetable[i].paraname + "page").find(".numinp")[0].value) - 1;
						// 	var shi4 = [];
						// 	if (savetable[i].kzresourcedataitemarray !== '') {
						// 		for (let ii = 0; ii < savetable[i].kzresourcedataitemarray.length; ii++) {
						// 			var shi2 = savetable[i].kzresourcedataitemarray[ii].id.split('-');
						// 			shi4.push(parseInt(shi2[0]) - parseInt(savetable[i].startpox))
						// 		}
						// 	}
						// 	savetable[i].nowdata = f.splice(b * savetable[i].nowend, savetable[i].nowend);
						// 	// savetable[i].nowdata = f.splice(b * (savetable[i].nowdata.length), savetable[i].nowdata.length);
						// }
						// setbodydata(2);
						// record();
						// break;
						// }

					}
				}
			}
		}


		// console.log(savetable)

		savetable[is].nowdata = JSON.parse(daitidata);
		savetable[is].tabledata1 = JSON.parse(daitidata1)

	}
	$('input').click(function () {
		let name = $(this).parent().parent().parent().parent().parent().parent()[0].id

		var kz
		for (let i = 0; i < savetable.length; i++) {
			if (savetable[i].paraname == name) {
				kz = savetable[i].kzdirection
			}
		}

		if (kz == '纵向扩展') {
			let a = $('#' + $(this).parent().parent().parent().parent().parent().parent()[0].id).find('.nowinput').length;
			for (let i1 = 0; i1 < a; i1++) {

				$($('#' + $(this).parent().parent().parent().parent().parent().parent()[0].id).find('.nowinput')[0]).removeClass('nowinput')
			}
			for (let i = 0; i < $($(this).parent().parent()[0]).find('input').length; i++) {
				$($($(this).parent().parent()[0]).find('input')[i]).addClass('nowinput')
			}
			for (let i = 0; i < savetable.length; i++) {
				if ($(this).parent().parent().parent().parent().parent().parent()[0].id == savetable[i].paraname) {
					let name = savetable[i].paraname
					let row = parseInt($(this).parent()[0].id.split('-')[0]) - parseInt(savetable[i].startpox) + 1
					let col = parseInt($(this).parent()[0].id.split('-')[1]) - parseInt(savetable[i].startpoy) + 1

					// jsObj.selectCell(name,row,col,$(this).val())
					jsObj.selectCell(name, col.toString(), row.toString(), $(this).val())

				}


			}

		} else if (kz == '横向扩展') {
			let a = $('#' + $(this).parent().parent().parent().parent().parent().parent()[0].id).find('.nowinput').length;
			for (let i1 = 0; i1 < a; i1++) {

				$($('#' + $(this).parent().parent().parent().parent().parent().parent()[0].id).find('.nowinput')[0]).removeClass('nowinput')
			}
			var id = parseInt($($(this).parent()[0]).attr('id').split('-')[0])

			for (let i = 0; i < $($("." + name)[0]).find('.dataready').length; i++) {
				if (parseInt($($($("." + name)[0]).find('.dataready')[i]).attr("id").split("-")[0]) == id) {

					$($($($("." + name)[0]).find('.dataready')[i]).find('input')[0]).addClass('nowinput')
					$($($("." + name)[0]).find('.dataready')[i]).addClass('nowinput')
				}

			}
			for (let i = 0; i < savetable.length; i++) {
				if ($(this).parent().parent().parent().parent().parent().parent()[0].id == savetable[i].paraname) {
					let name = savetable[i].paraname
					let row = parseInt($(this).parent()[0].id.split('-')[0]) - parseInt(savetable[i].startpox) + 1
					let col = parseInt($(this).parent()[0].id.split('-')[1]) - parseInt(savetable[i].startpoy) + 1

					// jsObj.selectCell(name,row,col,$(this).val())
					jsObj.selectCell(name, col.toString(), row.toString(), $(this).val())
				}
			}
		}

	})
	$('.datareadyhead ').click(function () {
		let name = $(this).parent().parent().parent().parent().parent()[0].id
		var kz
		for (let i = 0; i < savetable.length; i++) {
			if (savetable[i].paraname == name) {
				kz = savetable[i].kzdirection

			}
		}
		if (kz == '纵向扩展') {
			let a = $('#' + $(this).parent().parent().parent().parent().parent()[0].id).find('.nowinput').length;
			for (let i1 = 0; i1 < a; i1++) {

				$($('#' + $(this).parent().parent().parent().parent().parent()[0].id).find('.nowinput')[0]).removeClass('nowinput')
			}
			for (let i = 0; i < $($(this).parent()[0]).find('.datareadyhead').length; i++) {
				$($($(this).parent()[0]).find('.datareadyhead')[i]).addClass('nowinput')
			}
			for (let i = 0; i < savetable.length; i++) {
				if ($(this).parent().parent().parent().parent().parent()[0].id == savetable[i].paraname) {
					let name = savetable[i].paraname

					let row = parseInt($(this)[0].id.split('-')[0]) - parseInt(savetable[i].startpox) + 1
					let col = parseInt($(this)[0].id.split('-')[1]) - parseInt(savetable[i].startpoy) + 1
					jsObj.selectCell(namecol.toString(), row.toString(), $($(this)[0]).text())
					// jsObj.selectCell(name,row,col,$(this).val())

				}

			}
		} else if (kz == '横向扩展') {
			let a = $('#' + $(this).parent().parent().parent().parent().parent()[0].id).find('.nowinput').length;
			for (let i1 = 0; i1 < a; i1++) {

				$($('#' + $(this).parent().parent().parent().parent().parent()[0].id).find('.nowinput')[0]).removeClass('nowinput')
			}
			for (let i = 0; i < $('#' + $(this).parent().parent().parent().parent().parent()[0].id).find('.datareadyhead').length; i++) {

				$($('#' + $(this).parent().parent().parent().parent().parent()[0].id).find('.datareadyhead')[i]).addClass('nowinput')
			}
			for (let i = 0; i < savetable.length; i++) {
				if ($(this).parent().parent().parent().parent().parent()[0].id == savetable[i].paraname) {
					let name = savetable[i].paraname

					let row = parseInt($(this)[0].id.split('-')[0]) - parseInt(savetable[i].startpox) + 1
					let col = parseInt($(this)[0].id.split('-')[1]) - parseInt(savetable[i].startpoy) + 1
					jsObj.selectCell(namecol.toString(), row.toString(), $($(this)[0]).text())
					// jsObj.selectCell(name,row,col,$(this).val())

				}

			}
		}


	})

}

function delay(index, i) {
	return new Promise((resolve) => {
		if (!i) {
			setTimeout(resolve, index * 0.1);
		} else {
			setTimeout(resolve, index * 0.001);
		}

	});
}

//权限控制
$("#input1").attr("checked", "checked"); //默认第一个选中
$('input:radio[name="radio1"]').change(function () {
	if ($("#input1").is(":checked")) {
		checked = 2;
		setbodydata();

	}
	if ($("#input2").is(":checked")) {
		checked = 1;
		setbodydata();
	}

})
function delnow() {
	let a1 = $('.nowinput').length;
	for (let i1 = 0; i1 < a1; i1++) {

		$($('.nowinput')[0]).removeClass('nowinput')
	}
}
async function sub(id) {
	await delnow()

	for (let dc = 0; dc < savetable.length; dc++) {
		if (id == savetable[dc].dckongjian) {
			if (savetable[dc].tabledata.length > 10000) {
				$('#tipdiv').show();
				return;
			}
			footarr = []
			$('.btabletop')[0].innerHTML = exporttitle
			$('.btableconterword')[0].innerHTML = exportword.replace('{0}', (dc + 1))
			// if(dc == 0){
			$('.btablecover').show()
			$('.tablesmallpass')[0].style.width = 0 + 'px'
			$('.tablepassword')[0].innerHTML = 0 + '%'
			// jsObj.startExportProgress()
			// }

			// jsObj.exportProgress(0);
			$('.cover').show();
			// setTimeout(async() => {
			$("#" + savetable.paraname).find("table tr").each(function (i, _tr) { //循环表格的行
				$(_tr).find(".jexcel_label").remove();
				var tds = $(_tr).find("td"); //得到每行的所有列
				tds.each(function (j, _td) { //循环每列
					var _ipt = $(_td).find("input"); //查找每列当中的INPUT控件
					var hasInput = (_ipt.length > 0) ? 1 : 0;
					if (hasInput) {
						//console.log('第'+(i+1)+'行'+(j+1)+'列含有INPUT控件');
						_ipt.attr("value", _ipt.val()); //如果有INPUT控件就给它设置value值
					}
				});
			});
			await delay(dc)
			// console.log(dc+1)
			// console.log(savetable.length+1)
			console.log(parseInt(100 * (parseFloat((dc) / (savetable.length)))))
			if (savetable[dc].kzdirection == '纵向扩展') {
				let nowdc = JSON.parse(JSON.stringify(dc))
				if (nowdc == 0) {
					nowdc = 1
				}

				if (typeof (savetable[dc]) == 'string') {
					var dait = savetable[dc]
				} else {
					var dait = JSON.stringify(savetable[dc])

				}


				var daiarr = savetable[dc].tabledata1.length
				var wantlengt = Math.ceil(daiarr / savetable[dc].kzresourcedataitemarray.length) + Number(savetable[dc].startpoy)

				var a = $(savetable[dc].daochudata)[0].cloneNode(true);
				var b = $(savetable[dc].daochudata)[0].cloneNode(true);
				// for(let i2=0;i2<$(b).find('tr').length;i2++){
				// 	for(let i3=0;i3<$($(b).find('tr')[i2]).find('td').length;i3++){
				// 		if($($($(b).find('tr')[i2]).find('td')[i3])[0].style.display=='none'||$($($(b).find('tr')[i2]).find('td')[i3]).attr('showtd')){
				// 			$($($(b).find('tr')[i2]).find('td')[i3]).addClass('delclass')

				// 		}

				// 		if($($($(b).find('tr')[i2]).find('td')[i3]).hasClass('borderleft')){
				// 			$($($(b).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderLeft':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		if($($($(b).find('tr')[i2]).find('td')[i3]).hasClass('bordertop')){
				// 			$($($(b).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderTop':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		if($($($(b).find('tr')[i2]).find('td')[i3]).hasClass('borderright')){
				// 			$($($(b).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderRight':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		if($($($(b).find('tr')[i2]).find('td')[i3]).hasClass('borderbottom')){
				// 			$($($(b).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderBottom':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		// console.log($(b).find('tr')[])
				// 		if(i2>savetable[dc].endpoy&&i2<(length5-1)){
				// 			if(!$($($(b).find('tr')[i2]).find('td')[i3]).hasClass('dataready')&&!$($($(b).find('tr')[i2]).find('td')[i3]).hasClass('datareadyfoot')){
				// 				$($(b).find('tr')[i2]).find('td')[i3].innerHTML = ''
				// 				$($($(b).find('tr')[i2]).find('td')[i3]).removeAttr('style')
				// 				$($($(b).find('tr')[i2]).find('td')[i3]).removeAttr('class')
				// 			}

				// 		}

				// 	}
				// }
				// for(let i2=0;i2<$(a).find('tr').length;i2++){
				// 	for(let i3=0;i3<$($(a).find('tr')[i2]).find('td').length;i3++){
				// 		if($($($(a).find('tr')[i2]).find('td')[i3])[0].style.display=='none'||$($($(a).find('tr')[i2]).find('td')[i3]).attr('showtd')){
				// 			$($($(a).find('tr')[i2]).find('td')[i3]).addClass('delclass')
				// 		}

				// 		if($($($(a).find('tr')[i2]).find('td')[i3]).hasClass('borderleft')){
				// 			$($($(a).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderLeft':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		if($($($(a).find('tr')[i2]).find('td')[i3]).hasClass('bordertop')){
				// 			$($($(a).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderTop':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		if($($($(a).find('tr')[i2]).find('td')[i3]).hasClass('borderright')){
				// 			$($($(a).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderRight':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		if($($($(a).find('tr')[i2]).find('td')[i3]).hasClass('borderbottom')){
				// 			$($($(a).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderBottom':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		// console.log($(b).find('tr')[])
				// 		if(i2>savetable[dc].endpoy&&i2<(length5-1)){
				// 			if(!$($($(a).find('tr')[i2]).find('td')[i3]).hasClass('dataready')&&!$($($(a).find('tr')[i2]).find('td')[i3]).hasClass('datareadyfoot')){
				// 				$($(a).find('tr')[i2]).find('td')[i3].innerHTML = ''
				// 				$($($(a).find('tr')[i2]).find('td')[i3]).removeAttr('style')
				// 				$($($(a).find('tr')[i2]).find('td')[i3]).removeAttr('class')
				// 			}

				// 		}

				// 	}
				// }
				var div = document.createElement('table');

				var length = $(a).find('.daochu').length

				for (let i1 = 0; i1 < length; i1++) {
					let a1 = 0;
					div.append($(a).find('.daochu')[a1])
					nowdc = JSON.parse(JSON.stringify(dc))
					if (nowdc == 0) {
						nowdc = 1
					}
					$('.tablesmallpass')[0].style.width = (330 * (parseInt(10 / (length - i1)) / 100)) + 'px'
					$('.tablepassword')[0].innerHTML = (330 * (parseInt(10 / (length - i1)))) + '%'
					await delay(i1)
				}
				var div1 = $(div)[0].cloneNode(true);

				for (let i = 0; i < $(div1).find('input').length; i++) {
					$(div1).find('input')[i].value = null;
				}

				for (let i1 = 0; i1 < $(div1).find('td').length; i1++) {
					if ($($(div1).find('td')[i1]).attr('id')) {
						// console.log(($().find('td')[i1]))
						// console.log(($(a).find('td')[i1].style.display))
						// console.log(parseInt($($(a).find('td')[i1]).attr('id').split('-')[0]))
						// console.log(parseInt(savetable[dc].startpox))
						if ($(div1).find('td')[i1].style.display == 'none' && (parseInt($($(div1).find('td')[i1]).attr('id').split('-')[0]) < parseInt(savetable[dc].startpox))) {
							$(div1).find('td')[i1].style.display = 'block'
						}
					}
					//                                   if($(a).find('td')[i1].style.display=='none'&&(parseInt($($(a).find('td')[i1]).attr('id').split('-')[0])<(savetable[dc].kzresourcedataitemarray.startpox))){
					//                                       $(a).find('td')[i1].style.display = 'block'
					//                                   }
				}
				a.id = 's'

				var sumdata1 = savetable[dc].kzsummotype.split(",");
				var length1 = $($(div).find('tr')[0]).find('input').length;
				var yl = $(div).find('input').length;
				if (savetable[dc].kzsummopos !== '分布在前') {
					var endlength = parseInt(length) + parseInt(savetable[dc].startpoy);
				} else {
					var endlength = parseInt(length) + sumdata1.length + parseInt(savetable[dc].startpoy);
				}

				var shi5 = [];
				var cidnex = 0
				if (savetable[dc].kzresourcedataitemarray.length !== 0) {
					cidnex = parseInt(savetable[dc].kzresourcedataitemarray[0].id.split('-')[0]) - parseInt(savetable[dc].startpox)
				}

				for (let ii = 0; ii < savetable[dc].kzresourcedataitemarray.length; ii++) {
					if (savetable[dc].kzresourcedataitemarray[ii].itemdata !== '序号' && savetable[dc].kzresourcedataitemarray[ii].itemdata !==
						'班次' && savetable[dc].kzresourcedataitemarray[ii].itemdata !== '归档时间') {
						if (savetable[dc].kzresourcedataitemarray[ii].xsnumber) {
							var shi2 = savetable[dc].kzresourcedataitemarray[ii].id.split('-');
							let a = {
								id: parseInt(shi2[0]) - parseInt(savetable[dc].startpox),
								xsnumber: parseInt(savetable[dc].kzresourcedataitemarray[ii].xsnumber),
								defauldisplay: savetable[dc].kzresourcedataitemarray[ii].defauldisplay
							}
							shi5.push(a)
						}
					}
				}

				var shi6 = [];
				for (let ii = 0; ii < savetable[dc].kzresourcedataitemarray.length; ii++) {
					if (savetable[dc].kzresourcedataitemarray[ii].itemdata == '归档时间') {
						var shi2 = savetable[dc].kzresourcedataitemarray[ii].id.split('-');
						let a = {
							id: parseInt(shi2[0]) - parseInt(savetable[dc].startpox),
							itemformat: savetable[dc].kzresourcedataitemarray[ii].itemformat
						}
						shi6.push(a)

					}
				}
				for (let cc1 = 1; cc1 < savetable[dc].daochuend; cc1++) {
					var lenght3 = length - 1;
					for (let cc = 0; cc < length; cc++) {
						var div3 = $($(div1).find("tr"))[lenght3].cloneNode(true);
						for (let a22 = 0; a22 < $(div3).find('.heibin').length; a22++) {
							$($(div3).find('.heibin')[a22]).attr('rowspan', 1)
							$($(div3).find('.heibin')[a22]).attr('colspan', 1)
						}
						//    if(cc1>1){

						// 	for (let cc11 = 0; cc11 < $(div3).find('td').length; cc11++) {
						// 		if(!$($(div3).find('td')[cc11]).hasClass('dataready')&&!$($(div3).find('td')[cc11]).hasClass('datareadyfoot')){
						// 			$(div3).find('td')[cc11].innerHTML = ''
						// 			$($(div3).find('td')[cc11]).removeAttr('style')
						// 		if($($(div3).find('td')[cc11]).hasClass('item')){
						// 			$($(div3).find('td')[cc11]).removeAttr('class')
						// 		}

						// 		}
						// 	}			
						// }
						$($(b).find('#row-' + endlength)[0]).after(div3)
						lenght3--;
					}
					nowdc = JSON.parse(JSON.stringify(dc))
					if (nowdc == 0) {
						nowdc = 1
					}
					$('.tablesmallpass')[0].style.width = (330 * (((parseInt(70 / (savetable[dc].daochuend - cc1))) + 10) / 100)) + 'px'
					console.log((330 * (((parseInt(70 / (savetable[dc].daochuend - cc1))) + 10) / 100)) + 'px')
					$('.tablepassword')[0].innerHTML = ((parseInt(70 / (savetable[dc].daochuend - cc1))) + 10) + '%'
					// jsObj.exportProgress;

					await delay(cc1)
				}
				for (let i4 = 0; i4 < savetable[dc].cellparaarray.length; i4++) {
					// console.log($(b).find("#" + savetable[dc].cellparaarray[i4].id))
					if (savetable[dc].cellparaarray[i4].value) {
						console.log($(b))
						$(b).find("#" + savetable[dc].cellparaarray[i4].id)[0].innerHTML = savetable[dc].cellparaarray[i4].value;
					}

				}
				var changeii = []
				let removeid = 0
				if (savetable[dc].kzresourcedataitemarray.length !== 0) {
					removeid = parseInt(endlength) + parseInt($($("#" + savetable[dc].paraname).find('td')[$("#" + savetable[dc].paraname).find('td').length - 1]).attr('id').split('-')[1]) - parseInt($($("#" + savetable[dc].paraname).find('.dataready')[$("#" + savetable[dc].paraname).find('.dataready').length - 1]).attr('id').split('-')[1])
				}

				if (savetable[dc].daochuend > 1) {
					for (let ii = parseInt(endlength); ii < parseInt(endlength) + parseInt($($("#" + savetable[dc].paraname).find('td')[$("#" + savetable[dc].paraname).find('td').length - 1]).attr('id').split('-')[1]) - parseInt($($("#" + savetable[dc].paraname).find('.dataready')[$("#" + savetable[dc].paraname).find('.dataready').length - 1]).attr('id').split('-')[1]); ii++) {
						let changeil = []
						for (let cc11 = 0; cc11 < $($(b).find('#row-' + ii)[0]).find('td').length; cc11++) {
							if (!$($($(b).find('#row-' + ii)[0]).find('td')[cc11]).hasClass('dataready') && !$($($(b).find('#row-' + ii)[0]).find('td')[cc11]).hasClass('datareadyfoot') && !$($($(b).find('#row-' + ii)[0]).find('td')[cc11]).hasClass('jexcel_label')) {
								if (ii <= (savetable[dc].endpoy + savetable[dc].kzsummotype.split(",").length)) {
									if ($($("#" + savetable[dc].paraname).find('#row-' + ii)[0]).find('td')[cc11]) {
										if ($($($("#" + savetable[dc].paraname).find('#row-' + ii)[0]).find('td')[cc11]).attr('style') || $($("#" + savetable[dc].paraname).find('#row-' + ii)[0]).find('td')[cc11].innerHTML || $($($("#" + savetable[dc].paraname).find('#row-' + ii)[0]).find('td')[cc11]).hasClass('bordertop') || $($($("#" + savetable[dc].paraname).find('#row-' + ii)[0]).find('td')[cc11]).hasClass('borderleft')) {
											changeil.push({
												index: cc11,
												text: $($("#" + savetable[dc].paraname).find('#row-' + ii)[0]).find('td')[cc11].innerHTML,
												style: $($($("#" + savetable[dc].paraname).find('#row-' + ii)[0]).find('td')[cc11]).attr('style'),
												classname: $($($("#" + savetable[dc].paraname).find('#row-' + ii)[0]).find('td')[cc11]).attr('class')
											})
										}
									}

									$($(b).find('#row-' + ii)[0]).find('td')[cc11].innerHTML = ''
									$($($(b).find('#row-' + ii)[0]).find('td')[cc11]).removeAttr('style')
									$($($(b).find('#row-' + ii)[0]).find('td')[cc11]).removeAttr('class')
								}
							}

						}
						changeii.push(changeil)
					}
				}
				console.log("changeii", changeii)
				var shengxiadata = (yl * savetable[dc].daochuend) - savetable[dc].tabledata1.length;

				for (let i = 0; i < shengxiadata; i++) {
					savetable[dc].tabledata1.push({
						value: null
					})
				}

				if (sumdata1[0] == "") {
					var now = parseInt(savetable[dc].startpoy) + 1;
				} else {
					var now = parseInt(savetable[dc].startpoy) + 1 + sumdata1.length;
				}
				if (savetable[dc].kzsummopos == '分布在后') {
					now = parseInt(savetable[dc].startpoy) + 1;
				}

				// if (savetable[dc].kzsummopos == '' || savetable[dc].kzsummopos == '无') {
				// 	var length5 = length * savetable[dc].daochuend;
				// } else {
				var length5 = (length) * savetable[dc].daochuend + now;
				// }
				var nowii = 0;
				var nowi2 = 0;
				let nowcii = 0
				for (let ii = now; ii < length5; ii++) {

					if (savetable[dc].daochuend > 1) {

						if (ii > endlength) {
							for (let cc11 = 0; cc11 < $($(b).find('tr')[ii]).find('td').length; cc11++) {
								if (!$($($(b).find('tr')[ii]).find('td')[cc11]).hasClass('dataready') && !$($($(b).find('tr')[ii]).find('td')[cc11]).hasClass('datareadyfoot') && !$($($(b).find('tr')[ii]).find('td')[cc11]).hasClass('jexcel_label')) {

									$($(b).find('tr')[ii]).find('td')[cc11].innerHTML = ''
									$($($(b).find('tr')[ii]).find('td')[cc11]).removeAttr('style')
									$($($(b).find('tr')[ii]).find('td')[cc11]).removeAttr('class')
								}
							}
						}
						if (ii > endlength && ii < removeid) {
							if (changeii.length > 0) {
								// for(let cc12 = 0; cc12 < changeii.length; cc12++){
								for (let cc11 = 0; cc11 < changeii[nowcii].length; cc11++) {

									if (changeii[nowcii][cc11].index > parseInt(savetable[dc].endpox) || changeii[nowcii][cc11].index < parseInt(savetable[dc].startpox)) {
										$($(b).find('tr')[ii]).find('td')[changeii[nowcii][cc11].index].innerHTML = changeii[nowcii][cc11].text
										$($($(b).find('tr')[ii]).find('td')[changeii[nowcii][cc11].index]).attr('class', changeii[nowcii][cc11].classname)
										$($($(b).find('tr')[ii]).find('td')[changeii[nowcii][cc11].index]).attr('style', changeii[nowcii][cc11].style)
									}

								}
								// }
								nowcii++
							}
						}
					}

					for (let i2 = 0; i2 < length1; i2++) {
						let an = nowi2;
						//             console.log($(b).find('tr')[ii])
						//                      console.log($($(b).find('tr')[ii]).find('input')[i2])
						// console.log(i2)
						if ($($(b).find('tr')[ii]).find('input')[i2].id == "null") {
							var xnumber = '';
							var de = '';
							var itemformat = null
							for (let i1 = 0; i1 < shi5.length; i1++) {
								if (shi5[i1].id == (i2 + parseInt(cidnex))) {
									xnumber = shi5[i1].xsnumber;


									de = shi5[i1].defauldisplay;

								}
							}

							for (let i1 = 0; i1 < shi6.length; i1++) {
								if (shi6[i1].id == (parseInt($($($(b).find('tr')[ii]).find('input')[i2]).parent().attr('id').split('-')[0]) - parseInt(savetable[dc].startpox))) {
									itemformat = shi6[i1].itemformat;
									break;
								} else {
									itemformat = null
								}
							}
							if (xnumber !== '') {

								if (getPointNum(savetable[dc].tabledata1[an].value, xnumber) == null || getPointNum(savetable[dc].tabledata1[
									an].value, xnumber) == '') {
									var aaa = ''
								} else {
									var aaa = getPointNum(savetable[dc].tabledata1[an].value, xnumber);
								}

								if (aaa == '') {
									if (de !== '') {

										if (de == 'null' || de == 'undefine' || de == null || de == undefined) {
											de = ''
										} else {
											$($(b).find('tr')[ii]).find('input')[i2].value = de;
											$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", de);
											if ($($(b).find('tr')[ii]).find('input')[i2].value == 'null' || !$($(b).find('tr')[ii]).find('input')[i2].value) {
												$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", '');
											}
										}

										if (wantlengt < ii) {
											de = ''
											$($(b).find('tr')[ii]).find('input')[i2].value = de;
											$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", de);
											if ($($(b).find('tr')[ii]).find('input')[i2].value == 'null' || !$($(b).find('tr')[ii]).find('input')[i2].value) {
												$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", '');
											}
										}

									} else {
										if (aaa == 'null' || aaa == 'undefine') {
											aaa = ''
										}

										$($(b).find('tr')[ii]).find('input')[i2].value = aaa;
										$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", aaa);
										if ($($(b).find('tr')[ii]).find('input')[i2].value == 'null' || !$($(b).find('tr')[ii]).find('input')[i2].value) {
											$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", '');
										}

									}
								} else {
									if (aaa == 'null' || aaa == 'undefine') {
										aaa = ''
									}

									$($(b).find('tr')[ii]).find('input')[i2].value = aaa;
									$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", aaa);
									if ($($(b).find('tr')[ii]).find('input')[i2].value == 'null' || !$($(b).find('tr')[ii]).find('input')[i2].value) {
										$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", '');
									}


								};

							} else {


								if (savetable[dc].tabledata1[an].value == null || savetable[dc].tabledata1[an].value == '') {
									var aaa = ''
								} else {
									var aaa = savetable[dc].tabledata1[an].value;
								}
								if (aaa == '') {
									if (de !== '') {
										if (de == null || de == undefined) {
											de = ''
										}

										$($(b).find('tr')[ii]).find('input')[i2].value = de;
										$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", de);
										if ($($(b).find('tr')[ii]).find('input')[i2].value == 'null' || !$($(b).find('tr')[ii]).find('input')[i2].value) {
											$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", '');
										}



									} else {
										if (aaa == 'null' || aaa == 'undefine') {
											aaa = ''
										}

										$($(b).find('tr')[ii]).find('input')[i2].value = aaa;
										$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", aaa);
										if ($($(b).find('tr')[ii]).find('input')[i2].value == 'null' || !$($(b).find('tr')[ii]).find('input')[i2].value) {
											$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", '');
										}


									}
								} else {
									if (aaa == 'null') {
										aaa = ''
									}

									$($(b).find('tr')[ii]).find('input')[i2].value = aaa;
									$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", aaa);;
									if ($($(b).find('tr')[ii]).find('input')[i2].value == 'null' || !$($(b).find('tr')[ii]).find('input')[i2].value) {
										$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", '');
									}

								}

							}


						} else {

							savetable[dc].tabledata1.splice(an, 0, {
								value: null
							})
							$($(b).find('tr')[ii]).find('input')[i2].value = savetable[dc].tabledata1[an].value;

							if (savetable[dc].tabledata1[an].value == null) {
								var aaa = ''
							} else {
								var aaa = savetable[dc].tabledata1[an].value;
							}
							if (aaa == 'null' || aaa == 'undefine') {
								aaa = ''
							}
							$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", aaa);;
							if ($($(b).find('tr')[ii]).find('input')[i2].value == 'null' || !$($(b).find('tr')[ii]).find('input')[i2].value) {
								$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", '');
							}

						}
						if (aaa) {
							if (itemformat) {
								aaa = dateFormat(itemformat, new Date(aaa))

								$($(b).find('tr')[ii]).find('input')[i2].value = aaa;

								$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", aaa);;
								if ($($(b).find('tr')[ii]).find('input')[i2].value == 'null' || !$($(b).find('tr')[ii]).find('input')[i2].value) {
									$($(b).find('tr')[ii]).find('input')[i2].setAttribute("value", '');
								}
							}
						}
						if (!isNaN($($(b).find('tr')[ii]).find('input')[i2].value)) {
							let arr = []
							arr.push($($(b).find('tr')[ii]).find('input')[i2].value)
							arr.push(i2)
							footarr.push(arr)
						}
						$('.tablesmallpass')[0].style.width = (330 * ((parseInt(20 * ((ii * length1 + i2) / (length5 * length1))) + 80) / 100)) + 'px'
						$('.tablepassword')[0].innerHTML = (parseInt(20 * ((ii * length1 + i2) / (length5 * length1))) + 80) + '%'
						await delay(i2, 0.5)
						nowi2++;
					}
					nowii++;
					nowdc = JSON.parse(JSON.stringify(dc))
					if (nowdc == 0) {
						nowdc = 1
					}

					// jsObj.exportProgress((parseInt(15/(length5-ii)))+80);



				}
				var wantdao = [];

				for (let a2 = 0; a2 < $($(b).find('.datareadyfoot').parent()[0]).find(".datareadyfoot").length; a2++) {
					if ($($(b).find('.datareadyfoot').parent()[0]).find(".datareadyfoot")[a2].innerHTML !== '\\' && $($(b).find(
						'.datareadyfoot').parent()[0]).find(".datareadyfoot")[a2].innerHTML !== "") {
						wantdao.push(a2)

					}
				}

				if (sumdata1.length !== 0) {
					var newarry = [];
					// for (let j = 0; j < savetable[dc].tabledata1.length; j++) {

					// 	for (let j1 = 0; j1 < wantdao.length; j1++) {
					// 		if ((j % (length1) == wantdao[j1])) {
					// 			var newarry1 = [];
					// 			newarry1.push(savetable[dc].tabledata1[j].value, wantdao[j1])
					// 			newarry.push(newarry1)
					// 		}
					// 	}
					// }
					for (let ii = 0; ii < wantdao.length; ii++) {
						for (let i = 0; i < sumdata1.length; i++) {
							if (sumdata1[i] == 'sum') {
								var sumdao = 0;
								for (let i2 = 0; i2 < footarr.length; i2++) {
									if (footarr[i2][1] == (wantdao[ii])) {
										if (!isNaN(parseFloat(footarr[i2][0]))) {
											sumdao = sumdao + parseFloat(footarr[i2][0]);
										}
									}
								}
								for (let ii2 = 0; ii2 < shi5.length; ii2++) {
									if (shi5[ii2].id == (wantdao[ii] + cidnex)) {
										sumdao = getPointNum(sumdao, shi5[ii2].xsnumber)
										break;
									}
								}
								if (isNaN(sumdao) || !sumdao) {
									sumdao = 0
								}
								if (Number($($(b).find('.datareadyfoot').parent()[i]).find(".datareadyfoot")[wantdao[ii]].innerHTML) + '' !== NaN + '') {
									$($(b).find('.datareadyfoot').parent()[i]).find(".datareadyfoot")[wantdao[ii]].innerHTML = sumdao
								}


							}
							if (sumdata1[i] == 'mean') {

								var sumdao = 0;

								var meandao = 0;
								for (let i2 = 0; i2 < footarr.length; i2++) {

									if (footarr[i2][1] == wantdao[ii]) {
										if (!isNaN(parseFloat(footarr[i2][0]))) {

											sumdao = sumdao + parseFloat(footarr[i2][0]);
											meandao++;
										}
									}
								}
								mean = sumdao / meandao;
								for (let ii2 = 0; ii2 < shi5.length; ii2++) {
									if (shi5[ii2].id == (wantdao[ii] + cidnex)) {
										mean = getPointNum(mean, shi5[ii2].xsnumber)
										break;
									}
								}
								if (isNaN(mean) || !mean) {
									mean = 0
								}
								if (Number($($(b).find('.datareadyfoot').parent()[i]).find(".datareadyfoot")[wantdao[ii]].innerHTML) + '' !== NaN + '') {
									$($(b).find('.datareadyfoot').parent()[i]).find(".datareadyfoot")[wantdao[ii]].innerHTML = mean
								}


							}
							if (sumdata1[i] == 'min') {
								var min = [];
								for (let i2 = 0; i2 < footarr.length; i2++) {
									if (footarr[i2][1] == wantdao[ii]) {
										if (!isNaN(parseFloat(footarr[i2][0]))) {
											min.push(parseFloat(footarr[i2][0]));
										}

									}
								}
								min.sort(function (a, b) {
									return a - b;
								})

								if (min[0] == "undefined") {

									$($(b).find('.datareadyfoot').parent()[i]).find(".datareadyfoot")[wantdao[ii]].innerHTML = null
								} else {
									for (let ii2 = 0; ii2 < shi5.length; ii2++) {
										if (shi5[ii2].id == (wantdao[ii] + cidnex)) {

											min[0] = getPointNum(min[0], shi5[ii2].xsnumber)
											break;
										}
									}
									if (isNaN(min[0]) || !min[0]) {
										min[0] = 0
									}
									if (Number($($(b).find('.datareadyfoot').parent()[i]).find(".datareadyfoot")[wantdao[ii]].innerHTML) + '' !== NaN + '') {
										$($(b).find('.datareadyfoot').parent()[i]).find(".datareadyfoot")[wantdao[ii]].innerHTML = min[0]
									}

								}

							}
							if (sumdata1[i] == 'max') {
								var max = [];
								for (let i2 = 0; i2 < footarr.length; i2++) {
									if (footarr[i2][1] == wantdao[ii]) {
										if (!isNaN(parseFloat(footarr[i2][0]))) {
											max.push(parseFloat(footarr[i2][0]));
										}

									}
								}
								max.sort(function (a, b) {
									return a - b;
								})

								if (max[max.length - 1] == "undefined") {

									$($(b).find('.datareadyfoot').parent()[i]).find(".datareadyfoot")[wantdao[ii]].innerHTML = null
								} else {
									for (let ii2 = 0; ii2 < shi5.length; ii2++) {
										if (shi5[ii2].id == (wantdao[ii] + cidnex)) {

											max[max.length - 1] = getPointNum(max[max.length - 1], shi5[ii2].xsnumber)
											break;
										}
									}
									if (isNaN(max[max.length - 1]) || !max[max.length - 1]) {
										max[max.length - 1] = 0
									}
									if (Number($($(b).find('.datareadyfoot').parent()[i]).find(".datareadyfoot")[wantdao[ii]].innerHTML) + '' !== NaN + '') {
										$($(b).find('.datareadyfoot').parent()[i]).find(".datareadyfoot")[wantdao[ii]].innerHTML = max[max.length -
											1]
									}

								}

							}
						}
					}
				}

				if (!$("#" + savetable[dc].paraname + "page")[0]) {

					b = $(savetable[dc].daochudata)[0].cloneNode(true);
				} else if ($("#" + savetable[dc].paraname + "page")[0]) {
					if ($("#" + savetable[dc].paraname + "page")[0].style.display == 'none') {

						b = $(savetable[dc].daochudata)[0].cloneNode(true);
					}

				}
				var ap = null
				if ($(savetable[dc].page)) {
					ap = $(savetable[dc].page).clone(true)
				}

				savetable[dc] = JSON.parse(dait)
				if (ap) {
					savetable[dc].page = ap
				}

				savetable[dc].daochudata = $('#' + savetable[dc].paraname).find('table')[0].cloneNode(true);

				let x = $(b).find(".jexcel_label").length;

				for (let y = 0; y < x; y++) {

					$(b).find(".jexcel_label")[0].remove()
				}


				for (let cc = 0; cc < $(b).find('.datareadyfoot').length; cc++) {
					if ($($(b).find('.datareadyfoot')[cc]).attr('colspan') == 1) {
						$($(b).find('.datareadyfoot')[cc]).removeAttr("colspan")
					}
					if ($($(b).find('.datareadyfoot')[cc]).attr('rowspan') == 1) {
						$($(b).find('.datareadyfoot')[cc]).removeAttr("rowspan")
					}
				}

				$('body').append(b)
				if (savetable[dc].daochuend == 1) {
					for (let cc = 0; cc < $(b).find('input').length; cc++) {

						if ($(b).find('input')[cc].value) {

							if ($(b).find('input')[cc].value == 'null' || !$(b).find('input')[cc].value) {
								$(b).find('input')[cc].setAttribute("value", '');
							} else {

								$(b).find('input')[cc].setAttribute("value", $(b).find('input')[cc].value);
							}

						} else {
							$(b).find('input')[cc].setAttribute("value", '');
						}


					}
				}



				// 		}
				// if(savetable[dc].daochuend<2){
				// for(let cc =0;cc<$(b).find('td').length;cc++){

				// 	if($($(b).find('td')[cc])[0].style.display=='none'||$($(b).find('td')[cc]).attr('showtd')){
				// 		$($(b).find('td')[cc]).addClass('delclass')
				// 	}


				// }



				// for(let i2=0;i2<$(b).find('tr').length;i2++){
				// 	for(let i3=0;i3<$($(b).find('tr')[i2]).find('td').length;i3++){
				// 		if($($($(b).find('tr')[i2]).find('td')[i3])[0].style.display=='none'||$($($(b).find('tr')[i2]).find('td')[i3]).attr('showtd')){
				// 			$($($(b).find('tr')[i2]).find('td')[i3]).addClass('delclass')
				// 		}

				// 		if($($($(b).find('tr')[i2]).find('td')[i3]).hasClass('borderleft')){
				// 			$($($(b).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderLeft':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		if($($($(b).find('tr')[i2]).find('td')[i3]).hasClass('bordertop')){
				// 			$($($(b).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderTop':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		if($($($(b).find('tr')[i2]).find('td')[i3]).hasClass('borderright')){
				// 			$($($(b).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderRight':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		if($($($(b).find('tr')[i2]).find('td')[i3]).hasClass('borderbottom')){
				// 			$($($(b).find('tr')[i2]).find('td')[i3]).css({
				// 				'borderBottom':'1px solid rgb(0,0,0)'
				// 			})
				// 		}
				// 		// console.log($(b).find('tr')[])
				// 		if(i2>savetable[dc].endpoy&&i2<(length5-1)){
				// 			if(!$($($(b).find('tr')[i2]).find('td')[i3]).hasClass('dataready')&&!$($($(b).find('tr')[i2]).find('td')[i3]).hasClass('datareadyfoot')){
				// 				$($(b).find('tr')[i2]).find('td')[i3].innerHTML = ''
				// 				$($($(b).find('tr')[i2]).find('td')[i3]).removeAttr('style')
				// 				$($($(b).find('tr')[i2]).find('td')[i3]).removeAttr('class')
				// 			}

				// 		}

				// 	}
				// }
				if (savetable[dc].daochuend == 1) {
					for (let i4 = 0; i4 < savetable[dc].cellparaarray.length; i4++) {
						// console.log($(b).find("#" + savetable[dc].cellparaarray[i4].id))
						if (savetable[dc].cellparaarray[i4].value) {
							console.log($(b))
							$(b).find("#" + savetable[dc].cellparaarray[i4].id)[0].innerHTML = savetable[dc].cellparaarray[i4].value;
						}

					}
				}

				for (let i5 = 0; i5 < $(b).find('.borderleft').length; i5++) {
					$($(b).find('.borderleft')[i5]).css({
						'borderLeft': '1px solid rgb(0,0,0)'
					})
				}
				for (let i5 = 0; i5 < $(b).find('.bordertop').length; i5++) {
					$($(b).find('.bordertop')[i5]).css({
						'borderTop': '1px solid rgb(0,0,0)'
					})
				}
				for (let i5 = 0; i5 < $(b).find('.borderright').length; i5++) {
					$($(b).find('.borderright')[i5]).css({
						'borderRight': '1px solid rgb(0,0,0)'
					})
				}
				for (let i5 = 0; i5 < $(b).find('.borderbottom').length; i5++) {
					$($(b).find('.borderbottom')[i5]).css({
						'borderBottom': '1px solid rgb(0,0,0)'
					})
				}
				let name = []
				for (let cc = 0; cc < $(b).find('.heibin').length; cc++) {
					for (let cc1 = 0; cc1 < $($(b).find('.heibin')[cc]).attr('name').split(',').length; cc1++) {
						if ($($(b).find('.heibin')[cc]).attr('name').split(',')[cc1]) {
							// console.log($(b).find('#'+$($(b).find('.heibin')[cc]).attr('name').split(',')[cc1]))
							let bb = $(b).find('#' + $($(b).find('.heibin')[cc]).attr('name').split(',')[cc1]).length
							for (let cc2 = 0; cc2 < bb; cc2++) {
								if (!name.includes($($(b).find('.heibin')[cc]).attr('name').split(',')[cc1])) {
									name.push($($(b).find('.heibin')[cc]).attr('name').split(',')[cc1])
									$($(b).find('#' + $($(b).find('.heibin')[cc]).attr('name').split(',')[cc1])[0]).remove()
								}

								// console.log($($(b).find('#'+$($(b).find('.heibin')[cc]).attr('name').split(',')[cc1])[cc2]))
							}
							// $($(b).find('#'+$($(b).find('.heibin')[cc]).attr('name').split(',')[cc1])[0]).remove()

						}



					}
				}




				$(b).hide();
				// await delay(10)
				$('.tablesmallpass')[0].style.width = (330) + 'px'
				$('.tablepassword')[0].innerHTML = (100) + '%'
				await delay(100)
				// jsObj.exportProgress(100);
				// jsObj.stopExportProgress();

				// $("#" + savetable[dc].paraname).hide()
				$(b).table2excel({ //选取导出的表格
					filename: "自定义报表", //导出的文件名 
					exclude_img: true, //是否导出图片 
					exclude_links: true,
					exclude_inputs: true,
					preserveColors: true
				});
				if (dc == savetable.length - 1) {
					// jsObj.updateHasNextExport(true)



				}
				console.log(parseInt(100 * (parseFloat((dc) / (savetable.length)))))
				nowdc = JSON.parse(JSON.stringify(dc))
				if (nowdc == 0) {
					nowdc = 1
				}



				$(b).remove();
				$('.btablecover').hide()
				$('.cover').hide();



			} else {
				nowdc = JSON.parse(JSON.stringify(dc))
				if (nowdc == 0) {
					nowdc = 1
				}


				var a = $(savetable[dc].daochudata)[0].cloneNode(true);
				var b = $(savetable[dc].daochudata)[0].cloneNode(true);
				var shi5 = [];
				for (let ii = 0; ii < savetable[dc].kzresourcedataitemarray.length; ii++) {
					if (savetable[dc].kzresourcedataitemarray[ii].itemdata !== '序号' && savetable[dc].kzresourcedataitemarray[ii].itemdata !==
						'班次' && savetable[dc].kzresourcedataitemarray[ii].itemdata !== '归档时间') {
						if (savetable[dc].kzresourcedataitemarray[ii].xsnumber) {

							var shi2 = savetable[dc].kzresourcedataitemarray[ii].id.split('-');

							let a = {
								id: parseInt(shi2[shi2.length - 1]) - parseInt(savetable[dc].startpoy),
								xsnumber: parseInt(savetable[dc].kzresourcedataitemarray[ii].xsnumber),
								defauldisplay: savetable[dc].kzresourcedataitemarray[ii].defauldisplay
							}
							shi5.push(a)
						}
					}
				}
				for (let a1 = 0; a1 < $(b).find('.heibin').length; a1++) {
					if (parseFloat($(b).find('.heibin')[a1].id.split('-')[1]) < parseFloat(savetable[dc].startpoy) && parseFloat($(b).find('.heibin')[a1].id.split('-')[0]) > parseFloat(savetable[dc].startpoy)) {
						if (parseFloat($(b).find('.heibin')[a1].id.split('-')[1]) + parseFloat($($('.heibin')[a1]).attr('rowspan')) > parseFloat(savetable[dc].startpoy)) {
							let c = parseFloat(savetable[dc].startpoy);
							$($(b).find('.heibin')[a1]).attr('rowspan', c)
							for (let a2 = 0; a2 < $($(b).find('.heibin')[a1]).attr('name').split(',').length; a2++) {
								let c1 = $($(b).find('.heibin')[a1]).attr('name').split(',')[a2]
								if (c1) {
									if (shi5.includes($('#' + c1)[0].id.split('-')[1])) {
										($($(b).find('.heibin')[a1]).find('#' + c1)).show()
									}
								}


							}
							console.log("sadsadsad", $($(b).find('.heibin')[a1]))

						}
					}

				}
				let x1 = $(b).find(".jexcel_label").length;
				for (let y = 0; y < x1; y++) {
					$(b).find(".jexcel_label")[0].remove
				}
				var div = document.createElement('table');
				var length = $(a).find('.daochu').length

				if (typeof (savetable[dc]) == 'string') {
					var dait = savetable[dc]
				} else {
					var dait = JSON.stringify(savetable[dc])
				}
				for (let i1 = 0; i1 < length; i1++) {
					let a1 = 0;
					div.append($(a).find('.daochu')[a1])
				}



				// $('body').append(div)
				deltable(div);
				var div1 = $(div)[0].cloneNode(true)
				var sumdata1 = savetable[dc].kzsummotype.split(",");
				var length1 = $($(div).find('tr')[0]).find('input').length;

				var shi6 = [];
				var shi4 = []

				for (let ii = 0; ii < savetable[dc].kzresourcedataitemarray.length; ii++) {
					if (savetable[dc].kzresourcedataitemarray[ii].itemformat && savetable[dc].kzresourcedataitemarray[ii].itemdata !== '班次') {
						var shi2 = savetable[dc].kzresourcedataitemarray[ii].id.split('-');
						let a = {
							id: parseInt(shi2[shi2.length - 1]) - parseInt(savetable[dc].startpoy),
							itemformat: savetable[dc].kzresourcedataitemarray[ii].itemformat,
							itemtype: savetable[dc].kzresourcedataitemarray[ii].itemtype,
							itemdata: savetable[dc].kzresourcedataitemarray[ii].itemdata
						}
						shi6.push(a)
					}
				}
				for (let num = 0; num < savetable[dc].daochuend - 1; num++) {
					if ($($(b).find("tr")[savetable[dc].startpox]).find('td').length < (255 - parseInt(savetable[dc].endpox) + parseInt(savetable[dc].startpox))) {
						for (let i1 = 0; i1 < $($(div1).find("tr")[0]).find('td').length; i1++) {
							for (let i2 = 0; i2 < $(div1).find("tr").length; i2++) {
								var c = $(div1)[0].cloneNode(true)


								$($(b).find('.daochu')[i2]).find('.dataready')[$($(b).find('.daochu')[i2]).find('.dataready').length - 1].after(
									$($(c).find("tr")[i2]).find('td')[i1])
							}
						}
					}
					nowdc = JSON.parse(JSON.stringify(dc))
					if (nowdc == 0) {
						nowdc = 1
					}
					console.log(parseInt((parseFloat((70 * (1 / savetable.length)) / (savetable[dc].daochuend - 1 - num))) + (100 * (parseFloat((dc) / (savetable.length))))))
					$('.tablesmallpass')[0].style.width = (330 * ((parseInt(70 / (savetable[dc].daochuend - 1 - num))) / 100)) + 'px'
					$('.tablepassword')[0].innerHTML = (parseInt(70 / (savetable[dc].daochuend - 1 - num))) + '%'
					// jsObj.exportProgress((parseInt(70/(savetable[dc].daochuend - 1 - num))));

					await delay(num)
				}
				var nowi2 = 0;
				// let ccd = JSON.stringify(savetable[dc].tabledata);
				for (let col = 0; col < $($(b).find('.daochu')[0]).find('.dataready').length; col++) {
					for (let row = 0; row < length; row++) {
						let an = nowi2;
						if (an >= savetable[dc].tabledata1.length) {
							savetable[dc].tabledata1.push({
								value: null
							})
						}
						if (!$($(b).find('.daochu')[row]).find('input')[col]) {
							break
						}
						var itemformat = null;

						if ($($(b).find('.daochu')[row]).find('input')[col].id !== 'undefined') {

							var xnumber = '';
							var de = '';

							for (let i1 = 0; i1 < shi5.length; i1++) {
								if ((shi5[i1].id) == row) {
									xnumber = shi5[i1].xsnumber;
									de = shi5[i1].defauldisplay;
									break;
								} else {
									xnumber = '';
									de = '';
								}
							}
							for (let i1 = 0; i1 < shi6.length; i1++) {
								if ((shi6[i1].id) == row && (shi6[i1].itemdata !== '序号' || shi6[i1].itemtype !== '辅助项')) {
									console.log("row", row)
									console.log(shi6)
									console.log($($(b).find('.daochu')[row]))
									itemformat = shi6[i1].itemformat;
									break;
								} else {
									itemformat = null;
								}
							}

							if (xnumber !== '') {


								if (getPointNum(savetable[dc].tabledata1[an].value, xnumber) == null || getPointNum(savetable[dc].tabledata1[
									an].value, xnumber) == '') {
									var aaa = ''
								} else {

									var aaa = getPointNum(savetable[dc].tabledata1[an].value, xnumber);
								}

								if (aaa == null || aaa == '') {

									if (de !== '') {
										if (de == null || de == undefined) {
											de = ''
										}
										$($(b).find('.daochu')[row]).find('input')[col].value = de;
										$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", de);
										if ($($(b).find('.daochu')[row]).find('input')[col].value == 'null' || !$($(b).find('.daochu')[row]).find('input')[col].value) {
											$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", '');
										}
									} else {
										if (aaa == 'null' || aaa == 'undefine') {
											aaa = ''
										}
										$($(b).find('.daochu')[row]).find('input')[col].value = aaa;
										$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", aaa);
										if ($($(b).find('.daochu')[row]).find('input')[col].value == 'null' || !$($(b).find('.daochu')[row]).find('input')[col].value) {
											$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", '');
										}
									}
								} else {
									if (aaa == 'null' || aaa == 'undefine') {
										aaa = ''
									}

									if (aaa !== '') {
										$($(b).find('.daochu')[row]).find('input')[col].value = aaa;
										$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", aaa);
										if ($($(b).find('.daochu')[row]).find('input')[col].value == 'null' || !$($(b).find('.daochu')[row]).find('input')[col].value) {
											$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", '');
										}
									} else {
										if (de == null || de == undefined) {
											de = ''
										}
										$($(b).find('.daochu')[row]).find('input')[col].value = de;
										$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", de);
										if ($($(b).find('.daochu')[row]).find('input')[col].value == 'null' || !$($(b).find('.daochu')[row]).find('input')[col].value) {
											$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", '');
										}
									}

								};
								if (aaa) {
									if (itemformat) {
										aaa = dateFormat(itemformat, new Date(aaa))
										$($(b).find('.daochu')[row]).find('input')[col].value = aaa;
										$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", aaa);
										if ($($(b).find('.daochu')[row]).find('input')[col].value == 'null' || !$($(b).find('.daochu')[row]).find('input')[col].value) {
											$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", '');
										}
									}
								}

							} else {
								if (savetable[dc].tabledata1[an].value == null || savetable[dc].tabledata1[an].value == '') {
									savetable[dc].tabledata1[an].value = ''
								}
								if (savetable[dc].tabledata1[an].value == 'null' || savetable[dc].tabledata1[an].value == 'undefine') {
									savetable[dc].tabledata1[an].value = ''
								}

								$($(b).find('.daochu')[row]).find('input')[col].value = savetable[dc].tabledata1[an].value;
								$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", savetable[dc].tabledata1[an].value);;
								if ($($(b).find('.daochu')[row]).find('input')[col].value == 'null' || !$($(b).find('.daochu')[row]).find('input')[col].value) {
									$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", '');
								}


							}
						} else {


							savetable[dc].tabledata1.splice(an, 0, {
								value: null
							})
							if (savetable[dc].tabledata1[an].value == null) {
								var aaa = ''
							} else {
								var aaa = savetable[dc].tabledata1[an].value;
							}


							if (aaa == '') {

								if (aaa == 'null' || aaa == 'undefine') {
									aaa = ''
								}
								console.log(aaa)
								$($(b).find('.daochu')[row]).find('input')[col].value = aaa;
								$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", aaa);;
								if ($($(b).find('.daochu')[row]).find('input')[col].value == 'null' || !$($(b).find('.daochu')[row]).find('input')[col].value) {
									$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", '');
								}

							} else {
								if (aaa == 'null' || aaa == 'undefine') {
									aaa = ''
								}

								$($(b).find('.daochu')[row]).find('input')[col].value = aaa;
								$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", aaa);
								if ($($(b).find('.daochu')[row]).find('input')[col].value == 'null' || !$($(b).find('.daochu')[row]).find('input')[col].value) {
									$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", '');
								}
							}

						}
						if ($($(b).find('.daochu')[row]).find('input')[col].value) {
							console.log(itemformat)
							if (itemformat) {
								// console.log($($(b).find('tr')[ii]).find('td')[i2])
								let aaa1 = dateFormat(itemformat, new Date($($(b).find('.daochu')[row]).find('input')[col].value))

								$($(b).find('.daochu')[row]).find('input')[col].value = aaa1;


								$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", aaa1);
								if ($($(b).find('.daochu')[row]).find('input')[col].value == 'null' || !$($(b).find('.daochu')[row]).find('input')[col].value) {
									$($(b).find('.daochu')[row]).find('input')[col].setAttribute("value", '');
								}

							}
						}
						// console.log(JSON.parse(JSON.stringify(savetable[dc].tabledata1.length)) )
						nowi2++;

						$('.tablesmallpass')[0].style.width = (330 * ((((parseInt(30 * ((col * length + row) / ($($(b).find('.daochu')[0]).find('.dataready').length * length))) + 70)) / 100))) + 'px'
						$('.tablepassword')[0].innerHTML = ((parseInt(30 * ((col * length + row) / ($($(b).find('.daochu')[0]).find('.dataready').length * length))) + 70)) + '%'
						await delay(col, 0.1)
					}
					nowdc = JSON.parse(JSON.stringify(dc))
					if (nowdc == 0) {
						nowdc = 1
					}

					// jsObj.exportProgress();


				}

				if (sumdata1.length !== 0) {
					for (let i1 = 0; i1 < sumdata1.length; i1++) {
						if (sumdata1[i1] == 'sum') {
							for (let i = 0; i < $(b).find('.daochu').length; i++) {
								var sumdao = 0;
								for (let j = 0; j < $($(b).find('.daochu')[i]).find('input').length; j++) {
									if (!isNaN((parseFloat($($(b).find('.daochu')[i]).find('input')[j].value))) && $($(b).find('.daochu')[i]).find(
										'input')[j].value !== null) {
										sumdao = sumdao + parseFloat($($(b).find('.daochu')[i]).find('input')[j].value)
									}

								}
								if ($($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML !== "" && $($(b).find('.daochu')[i]).find(
									'.datareadyfoot')[i1].innerHTML !== "\\") {
									for (let ii2 = 0; ii2 < shi5.length; ii2++) {
										if (shi5[ii2].id == (i)) {
											sumdao = getPointNum(sumdao, shi5[ii2].xsnumber)
											break;
										}
									}
									if (isNaN(sumdao) || !sumdao) {
										sumdao = 0
									}
									if (Number($($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML) + '' !== NaN + '') {

										$($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML = sumdao;
									}

								}

							}
						}
						if (sumdata1[i1] == 'mean') {
							for (let i = 0; i < $(b).find('.daochu').length; i++) {
								var sumdao = 0;
								var mean = 0;
								for (let j = 0; j < $($(b).find('.daochu')[i]).find('input').length; j++) {
									if (!isNaN((parseFloat($($(b).find('.daochu')[i]).find('input')[j].value))) && $($(b).find('.daochu')[i]).find(
										'input')[j].value !== null) {
										sumdao = sumdao + parseFloat($($(b).find('.daochu')[i]).find('input')[j].value)
										mean++
									}

								}
								var meandata = sumdao / mean;
								for (let ii2 = 0; ii2 < shi5.length; ii2++) {
									if (shi5[ii2].id == i) {
										mean = getPointNum(meandata, shi5[ii2].xsnumber)
										break;
									}
								}
								if (isNaN(mean) || !mean) {
									mean = 0
								}
								if ($($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML !== "" && $($(b).find('.daochu')[i]).find(
									'.datareadyfoot')[i1].innerHTML !== "\\") {
									if (Number($($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML) + '' !== NaN + '') {

										$($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML = mean;
									}

								}


							}
						}
						if (sumdata1[i1] == 'max') {
							for (let i = 0; i < $(b).find('.daochu').length; i++) {
								var max = [];
								for (let j = 0; j < $($(b).find('.daochu')[i]).find('input').length; j++) {
									if (!isNaN((parseFloat($($(b).find('.daochu')[i]).find('input')[j].value))) && $($(b).find('.daochu')[i]).find(
										'input')[j].value !== null) {
										max.push(parseFloat($($(b).find('.daochu')[i]).find('input')[j].value))

									}
									max.sort(function (a, b) {
										return a - b;
									})

								}
								if (isNaN(max[max.length - 1]) || !max[max.length - 1]) {
									max[max.length - 1] = 0
								}
								if ($($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML !== "" && $($(b).find('.daochu')[i]).find(
									'.datareadyfoot')[i1].innerHTML !== "\\") {
									if (Number($($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML) + '' !== NaN + '') {


										if (max[max.length - 1] == "undefined") {

											$($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML = null;
										} else {
											$($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML = max[max.length - 1];
										}
									}


								}


							}
						}
						if (sumdata1[i1] == 'min') {
							for (let i = 0; i < $(b).find('.daochu').length; i++) {
								var min = [];
								for (let j = 0; j < $($(b).find('.daochu')[i]).find('input').length; j++) {
									if (!isNaN((parseFloat($($(b).find('.daochu')[i]).find('input')[j].value))) && $($(b).find('.daochu')[i]).find(
										'input')[j].value !== null) {
										min.push(parseFloat($($(b).find('.daochu')[i]).find('input')[j].value))

									}
									min.sort(function (a, b) {
										return a - b;
									})

								}
								if (isNaN(min[0]) || !min[0]) {
									min[0] = 0
								}

								if ($($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML !== "" && $($(b).find('.daochu')[i]).find(
									'.datareadyfoot')[i1].innerHTML !== "\\") {
									if (Number($($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML) + '' !== NaN + '') {

										if (min[0] == "undefined") {
											$($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML = null;
										} else {
											$($(b).find('.daochu')[i]).find('.datareadyfoot')[i1].innerHTML = min[0];
										}

									}


								}


							}
						}
					}

				}

				if (!$("#" + savetable[dc].paraname + "page")[0]) {

					b = $(savetable[dc].daochudata)[0].cloneNode(true);
				} else if ($("#" + savetable[dc].paraname + "page")[0]) {
					if ($("#" + savetable[dc].paraname + "page")[0].style.display == 'none') {

						b = $(savetable[dc].daochudata)[0].cloneNode(true);
					}

				}
				// savetable[dc].tabledata = JSON.parse(ccd);
				var ap = null
				if ($(savetable[dc].page)) {
					ap = $(savetable[dc].page).clone(true)
				}

				savetable[dc] = JSON.parse(dait)
				if (ap) {
					savetable[dc].page = ap
				}
				$('body').append(b)
				let x = $(b).find(".jexcel_label").length;

				for (let y = 0; y < x; y++) {

					$(b).find(".jexcel_label")[0].remove()
				}
				for (let i4 = 0; i4 < savetable[dc].cellparaarray.length; i4++) {
					if (savetable[dc].cellparaarray[i4].value) {
						console.log($(b))
						$(b).find("#" + savetable[dc].cellparaarray[i4].id)[0].innerHTML = savetable[dc].cellparaarray[i4].value;
					}
				}
				for (let cc = 0; cc < $(b).find('.datareadyfoot').length; cc++) {
					if ($($(b).find('.datareadyfoot')[cc]).attr('colspan') == 1) {
						$($(b).find('.datareadyfoot')[cc]).removeAttr("colspan")
					}
					if ($($(b).find('.datareadyfoot')[cc]).attr('rowspan') == 1) {
						$($(b).find('.datareadyfoot')[cc]).removeAttr("rowspan")
					}
				}
				if (savetable[dc].daochuend == 1) {
					for (let cc = 0; cc < $(b).find('input').length; cc++) {

						if ($(b).find('input')[cc].value) {

							if ($(b).find('input')[cc].value == 'null' || !$(b).find('input')[cc].value) {
								$(b).find('input')[cc].setAttribute("value", '');
							} else {

								$(b).find('input')[cc].setAttribute("value", $(b).find('input')[cc].value);
							}

						} else {
							$(b).find('input')[cc].setAttribute("value", '');
						}


					}
				}

				for (let i5 = 0; i5 < $(b).find('.borderleft').length; i5++) {
					$($(b).find('.borderleft')[i5]).css({
						'borderLeft': '1px solid rgb(0,0,0)'
					})
				}
				for (let i5 = 0; i5 < $(b).find('.bordertop').length; i5++) {
					$($(b).find('.bordertop')[i5]).css({
						'borderTop': '1px solid rgb(0,0,0)'
					})
				}
				for (let i5 = 0; i5 < $(b).find('.borderright').length; i5++) {
					$($(b).find('.borderright')[i5]).css({
						'borderRight': '1px solid rgb(0,0,0)'
					})
				}
				for (let i5 = 0; i5 < $(b).find('.borderbottom').length; i5++) {
					$($(b).find('.borderbottom')[i5]).css({
						'borderBottom': '1px solid rgb(0,0,0)'
					})
				}
				for (let cc = 0; cc < $(b).find('.heibin').length; cc++) {
					for (let cc1 = 0; cc1 < $($(b).find('.heibin')[cc]).attr('name').split(',').length; cc1++) {
						if ($($(b).find('.heibin')[cc]).attr('name').split(',')[cc1]) {
							let bb = $(b).find('#' + $($(b).find('.heibin')[cc]).attr('name').split(',')[cc1]).length
							for (let cc2 = 0; cc2 < bb; cc2++) {
								$($(b).find('#' + $($(b).find('.heibin')[cc]).attr('name').split(',')[cc1])[0]).remove()
							}
						}



					}
				}

				// for(let cc =0;cc<$(b).find('td').length;cc++){

				// 	if($($(b).find('td')[cc])[0].style.display=='none'){
				// 		$($(b).find('td')[cc]).addClass('delclass')
				// 	}

				// }

				// let end = $(b).find('.delclass').length
				// for(let cc =0;cc<end;cc++){
				// 	$($(b).find('.delclass')[0]).remove()

				// }
				$(b).hide();
				// $("#" + savetable[dc].paraname).hide()
				// await delay(10)
				$('.tablesmallpass')[0].style.width = 330 + 'px'
				$('.tablepassword')[0].innerHTML = 100 + '%'
				await delay(100)
				//   jsObj.exportProgress(100);
				// jsObj.stopExportProgress();
				$(b).table2excel({ //选取导出的表格
					filename: "自定义报表", //导出的文件名 
					exclude_img: true, //是否导出图片 
					exclude_links: true,
					exclude_inputs: true,
					preserveColors: true
				});

				savetable[dc].daochudata = $('#' + savetable[dc].paraname).find('table')[0].cloneNode(true);

				$(b).remove();

				nowdc = JSON.parse(JSON.stringify(dc))
				if (nowdc == 0) {
					nowdc = 1
				}


				$('.btablecover').hide()
				$('.cover').hide();
				// if(dc == savetable.length-1){


				// }

			}

			// }, 1000)
		}
	}


}

function deltable(div) {

	var z = $(div).find("td").length
	var a = 0;

	for (let i2 = 0; i2 < z; i2++) {

		if (!$($(div).find("td")[a]).hasClass('del')) {

			$($($(div).find("td")[a])).remove();

		} else {

			$($(div).find("td")[a]).find("input")[0].value = null;
			a++
		}
	}
}
//修改后保持
function save() {
	if (kchange) {
		for (let i = 4; i < $('input').length; i++) {
			if (isNaN($('input')[i].value)) {
				alert("数据格式错误")

			} else {
				var nowchangedata = [];
				nowchangedata.push(changedata[0])
				for (let a = 0; a < changedata.length; a++) {
					for (let b = 0; b < nowchangedata.length; b++) {
						if (changedata[a].id == nowchangedata[b].id) { } else {
							nowchangedata.push(changedata[a])
						}
					}
				}


			}
		}

	} else {
		alert(id1 + "不是数字")
	}

}

// 下一页初始化数据的方法
function record() {

	for (let i = 0; i < savetable.length; i++) {
		for (var b = 0; b < savetable[i].cellparaarray.length; b++) {
			if (savetable[i].cellparaarray[b].hasOwnProperty('value')) {
				$("#" + savetable[i].paraname).find('#' + savetable[i].cellparaarray[b].id)[0].innerHTML = savetable[i].cellparaarray[
					b].value;
			}
		}
	}

}
//初始化数据项方法
var a = [{ "name": "数据列2", "value": "7872.3987", "sumtype": "合计", "statisticstype": null, "statisticsbanci": null, "sourcetype": "外部数据源", "sourceid": "854b57b8-6b1e-451b-a8ec-2c7593ea4689", "format": null }, { "name": "数据列2", "value": "218.677741666667", "sumtype": "平均", "statisticstype": null, "statisticsbanci": null, "sourcetype": "外部数据源", "sourceid": "854b57b8-6b1e-451b-a8ec-2c7593ea4689", "format": null }, { "name": "数据列2", "value": "237.9296", "sumtype": "最大", "statisticstype": null, "statisticsbanci": null, "sourcetype": "外部数据源", "sourceid": "854b57b8-6b1e-451b-a8ec-2c7593ea4689", "format": null }, { "name": "数据列2", "value": "199.3127", "sumtype": "最小", "statisticstype": null, "statisticsbanci": null, "sourcetype": "外部数据源", "sourceid": "854b57b8-6b1e-451b-a8ec-2c7593ea4689", "format": null }]
var a1 = [{ "name": "GD_REAL1", "value": "67133.3465", "sumtype": "合计", "statisticstype": null, "statisticsbanci": null, "sourcetype": "历史归档", "sourceid": null, "format": null }, { "name": "GD_REAL1", "value": "313.707226635514", "sumtype": "平均", "statisticstype": null, "statisticsbanci": null, "sourcetype": "历史归档", "sourceid": null, "format": null }, { "name": "GD_REAL1", "value": "491.9876", "sumtype": "最大", "statisticstype": null, "statisticsbanci": null, "sourcetype": "历史归档", "sourceid": null, "format": null }, { "name": "GD_REAL1", "value": "33.98765", "sumtype": "最小", "statisticstype": null, "statisticsbanci": null, "sourcetype": "历史归档", "sourceid": null, "format": null }]
var a2 = [{ "name": "GD_REAL2", "value": "2071.38596666667", "sumtype": "合计", "statisticstype": "周", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "517.846491666667", "sumtype": "平均", "statisticstype": "周", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "1031.65446666667", "sumtype": "最大", "statisticstype": "周", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "0", "sumtype": "最小", "statisticstype": "周", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }]
var a3 = [{ "name": "GD_REAL2", "value": "1227.90138333333", "sumtype": "合计", "statisticstype": "月", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "613.950691666666", "sumtype": "平均", "statisticstype": "月", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "773.74085", "sumtype": "最大", "statisticstype": "月", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "454.160533333333", "sumtype": "最小", "statisticstype": "月", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }]
var a4 = [{ "name": "GD_REAL2", "value": "2071.38596666667", "sumtype": "合计", "statisticstype": "周", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "517.846491666667", "sumtype": "平均", "statisticstype": "周", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "1031.65446666667", "sumtype": "最大", "statisticstype": "周", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "0", "sumtype": "最小", "statisticstype": "周", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }]
var a5 = [{ "name": "GD_REAL2", "value": "5819.9266", "sumtype": "合计", "statisticstype": "日", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "581.99266", "sumtype": "平均", "statisticstype": "日", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "1950.988", "sumtype": "最大", "statisticstype": "日", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }, { "name": "GD_REAL2", "value": "0", "sumtype": "最小", "statisticstype": "日", "statisticsbanci": "全部", "sourcetype": "统计归档", "sourceid": null, "format": null }]
// initItem("ParameterReport22",a);
// initItem("ParameterReport22",a1);
// initItem("ParameterReport22",a3);
// initItem("ParameterReport22",a4);
// initItem("ParameterReport22",a5);
function notip() {
	$('#tipdiv').hide();
}
function clearitem(id) {
	for (let i = 0; i < savetable.length; i++) {
		if (savetable[i].paraname == id) {
			savetable[i].cellparaarray = savetable[i].cellparaarray.filter(item => {
				if (item.itemtype) {
					return item;
				}
			});
			// alert("nul或者空数组进数据项")
			for (let b = 0; b < savetable[i].cellparaarray.length; b++) {
				if (savetable[i].cellparaarray[b].defauldisplay) {
					savetable[i].cellparaarray[b].value = savetable[i].cellparaarray[b].defauldisplay;

				} else {
					savetable[i].cellparaarray[b].value = ''
				}



			}
		}

	}
}

//initItem("ParameterReport20",[])
//initItem("ParameterReport27",[])
//initItem("ParameterReport28",[])
// initItem("ParameterReport27",[{"name":"C0","value":"374658","sumtype":"合计","statisticstype":null,"statisticsbanci":null,"sourcetype":"历史归档","sourceid":null}])
//initItem("ParameterReport28", [{"name":"b0","value":"334635","sumtype":"合计","statisticstype":null,"statisticsbanci":null,"sourcetype":"历史归档","sourceid":null},{"name":"b1","value":"410374","sumtype":"合计","statisticstype":null,"statisticsbanci":null,"sourcetype":"历史归档","sourceid":null},{"name":"b2","value":"398582","sumtype":"合计","statisticstype":null,"statisticsbanci":null,"sourcetype":"历史归档","sourceid":null},{"name":"b3","value":"390262","sumtype":"合计","statisticstype":null,"statisticsbanci":null,"sourcetype":"历史归档","sourceid":null}])
//initItem("ParameterReport10",[{"name":"NB_REAL2","value":"284.92585","sumtype":"合计","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"NB_REAL2","value":"21.9173730769231","sumtype":"平均","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"NB_REAL2","value":"193.9876","sumtype":"最大","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"NB_REAL2","value":"0","sumtype":"最小","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"GD_REAL2","value":"1218.92565","sumtype":"合计","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"GD_REAL2","value":"101.5771375","sumtype":"平均","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"GD_REAL2","value":"413.9876","sumtype":"最大","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"GD_REAL2","value":"0","sumtype":"最小","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null}])
//initItem("ParameterReport10",[{"name":"NB_REAL3","value":"290.92585","sumtype":"合计","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"NB_REAL3","value":"22.3789115384615","sumtype":"平均","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"NB_REAL3","value":"194.9876","sumtype":"最大","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"NB_REAL3","value":"0","sumtype":"最小","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"GD_REAL3","value":"1224.92565","sumtype":"合计","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"GD_REAL3","value":"414.9876","sumtype":"最大","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"GD_REAL3","value":"102.0771375","sumtype":"平均","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null},{"name":"GD_REAL3","value":"0","sumtype":"最小","statisticstype":"日","statisticsbanci":"C班","sourcetype":"统计归档","sourceid":null}])
function initItem(id, recitemdata, data) {
	console.log('id', id)
	console.log('recitemdata', recitemdata)
	console.log("data", savetable)
	var recitemdataobj = [];
	if (recitemdata == null || recitemdata == '[]') {
		recitemdataobj = []
	} else {
		if (typeof (recitemdata) == 'string') {
			recitemdataobj = JSON.parse(recitemdata)
		} else {
			recitemdataobj = recitemdata
		}

	}
	// var recitemdataobj = recitemdata;
	if (recitemdataobj == null || recitemdataobj == []) {
		recitemdataobj = [];
	}

	// if ($("#" + id)[0] == undefined) {

	// 	var itemhtml = JSON.parse(data);
	// 	// var itemhtml = data;
	// 	var divbox = itemhtml.zhtml.replace(/[\\]/g, '');

	// 	var divone = document.createElement('div');
	// 	divone.id = itemhtml.paraname;
	// 	$("#" + itemhtml.paraname).remove();
	// 	$(divone).append(divbox);
	// 	$('body').append(divone);
	// 	savetable.push(itemhtml)
	// 	for (let a = 0; a < recitemdataobj.length; a++) {
	// 		for (let b = 0; b < itemhtml.cellparaarray.length; b++) {
	// 			if (recitemdataobj[a].name == "查询时间" || recitemdataobj[a].name == "查询账号") {
	// 				if (itemhtml.cellparaarray[b].itemdata == recitemdataobj[a].name) {
	// 					$("#" + id).find("#" + itemhtml.cellparaarray[b].id)[0].innerHTML = recitemdataobj[a].value
	// 					itemhtml.cellparaarray[b].value = recitemdataobj[a].value;
	// 				}
	// 			} else {
	//                      if(recitemdataobj[a].sourcetype == '统计归档'){
	// 					  if(recitemdataobj[a].statisticsbanci == null){
	// 					  	recitemdataobj[a].statisticsbanci  = '全部'
	// 					  }
	// 					  if (itemhtml.cellparaarray[b].itemdata == recitemdataobj[a].name && itemhtml.cellparaarray[b].sumtype ==
	// 					  	recitemdataobj[a].sumtype&&itemhtml.cellparaarray[b].timewd == recitemdataobj[a].statisticstype&&itemhtml.cellparaarray[b].banciwd == recitemdataobj[a].statisticsbanci) {

	// 					  	if (!recitemdataobj[a].value) {
	// 					  	$("#" + id).find("#" + itemhtml.cellparaarray[b].id)[0].innerHTML = getPointNum(parseFloat(itemhtml.cellparaarray[
	// 					  			b].defauldisplay),
	// 					  		parseFloat(itemhtml.cellparaarray[b].xsnumber));
	// 					  	itemhtml.cellparaarray[b].value = getPointNum(parseFloat(itemhtml.cellparaarray[
	// 					  			b].defauldisplay),
	// 					  		parseFloat(itemhtml.cellparaarray[b].xsnumber));
	// 					  	} else {
	// 							$("#" + id).find("#" + itemhtml.cellparaarray[b].id)[0].innerHTML = getPointNum(parseFloat(recitemdataobj[a].value),
	// 								parseFloat(itemhtml.cellparaarray[
	// 									b].xsnumber))
	// 							itemhtml.cellparaarray[b].value = getPointNum(parseFloat(recitemdataobj[a].value),
	// 								parseFloat(itemhtml.cellparaarray[
	// 									b].xsnumber))

	// 					  	}
	// 					  }
	// 				  }else if(recitemdataobj[a].sourcetype == '历史归档'){
	// 					  if (itemhtml.cellparaarray[b].itemdata == recitemdataobj[a].name && itemhtml.cellparaarray[b].sumtype ==recitemdataobj[a].sumtype) {

	// 					  	if (!recitemdataobj[a].value) {
	// 					  	$("#" + id).find("#" + itemhtml.cellparaarray[b].id)[0].innerHTML = getPointNum(parseFloat(itemhtml.cellparaarray[
	// 					  			b].defauldisplay),
	// 					  		parseFloat(itemhtml.cellparaarray[b].xsnumber));
	// 					  	itemhtml.cellparaarray[b].value = getPointNum(parseFloat(itemhtml.cellparaarray[
	// 					  			b].defauldisplay),
	// 					  		parseFloat(itemhtml.cellparaarray[b].xsnumber));
	// 					  	} else {
	// 							$("#" + id).find("#" + itemhtml.cellparaarray[b].id)[0].innerHTML = getPointNum(parseFloat(recitemdataobj[a].value),
	// 								parseFloat(itemhtml.cellparaarray[
	// 									b].xsnumber))
	// 							itemhtml.cellparaarray[b].value = getPointNum(parseFloat(recitemdataobj[a].value),
	// 								parseFloat(itemhtml.cellparaarray[
	// 									b].xsnumber))

	// 					  	}
	// 					  }
	// 				  }else if(recitemdataobj[a].sourcetype == '外部数据源'){
	// 					  if (itemhtml.cellparaarray[b].itemdata == recitemdataobj[a].name && itemhtml.cellparaarray[b].sumtype ==recitemdataobj[a].sumtype&& itemhtml.cellparaarray[b].resourcedataid ==recitemdataobj[a].sourceid) {

	// 					  	if (!recitemdataobj[a].value) {
	// 					  	$("#" + id).find("#" + itemhtml.cellparaarray[b].id)[0].innerHTML = getPointNum(parseFloat(itemhtml.cellparaarray[
	// 					  			b].defauldisplay),
	// 					  		parseFloat(itemhtml.cellparaarray[b].xsnumber));
	// 					  	itemhtml.cellparaarray[b].value = getPointNum(parseFloat(itemhtml.cellparaarray[
	// 					  			b].defauldisplay),
	// 					  		parseFloat(itemhtml.cellparaarray[b].xsnumber));
	// 					  	} else {
	// 					  								$("#" + id).find("#" + itemhtml.cellparaarray[b].id)[0].innerHTML = getPointNum(parseFloat(recitemdataobj[a].value),
	// 					  									parseFloat(itemhtml.cellparaarray[
	// 					  										b].xsnumber))
	// 					  								itemhtml.cellparaarray[b].value = getPointNum(parseFloat(recitemdataobj[a].value),
	// 					  									parseFloat(itemhtml.cellparaarray[
	// 					  										b].xsnumber))

	// 					  	}
	// 					  }
	// 				  }

	// 			}

	// 		}
	// 	}
	// }
	console.log(savetable)
	console.log(recitemdataobj)
	for (let i = 0; i < savetable.length; i++) {
		if (savetable[i].paraname == id) {
			for (let a = 0; a < recitemdataobj.length; a++) {
				for (let b = 0; b < savetable[i].cellparaarray.length; b++) {
					if (recitemdataobj[a].name == "查询时间" || recitemdataobj[a].name == "查询账号") {
						if (recitemdataobj[a].name == '查询账号') {
							if (savetable[i].cellparaarray[b].itemdata == recitemdataobj[a].name) {
								savetable[i].cellparaarray[b].value = recitemdataobj[a].value
							}
						} else {
							if (savetable[i].cellparaarray[b].itemdata == recitemdataobj[a].name && savetable[i].cellparaarray[b].itemformat == recitemdataobj[a].format) {
								savetable[i].cellparaarray[b].value = recitemdataobj[a].value
							}
						}

						console.log("111", savetable)
					} else {

						if (recitemdataobj[a].sourcetype == '统计归档' && savetable[i].cellparaarray[b].resource == '统计归档') {
							if (recitemdataobj[a].statisticsbanci == null) {
								recitemdataobj[a].statisticsbanci = '全部'
							}
							if (savetable[i].cellparaarray[b].itemdata == recitemdataobj[a].name && savetable[i].cellparaarray[b].sumtype == recitemdataobj[a].sumtype && savetable[i].cellparaarray[b].timewd == recitemdataobj[a].statisticstype && savetable[i].cellparaarray[b].banciwd == recitemdataobj[a].statisticsbanci) {
								if (!recitemdataobj[a].value) {
									savetable[i].cellparaarray[b].value = getPointNum(parseFloat(savetable[i].cellparaarray[b].defauldisplay), parseFloat(savetable[i].cellparaarray[b].xsnumber));


								} else {

									savetable[i].cellparaarray[b].value = getPointNum(parseFloat(recitemdataobj[a].value), parseFloat(savetable[i].cellparaarray[b].xsnumber));
								}
							}

						} else if (recitemdataobj[a].sourcetype == '历史归档' && savetable[i].cellparaarray[b].resource == '历史归档') {
							if (savetable[i].cellparaarray[b].itemdata == recitemdataobj[a].name && savetable[i].cellparaarray[b].sumtype == recitemdataobj[a].sumtype) {
								if (!recitemdataobj[a].value) {
									savetable[i].cellparaarray[b].value = getPointNum(parseFloat(savetable[i].cellparaarray[b].defauldisplay), parseFloat(savetable[i].cellparaarray[b].xsnumber));

								} else {
									savetable[i].cellparaarray[b].value = getPointNum(parseFloat(recitemdataobj[a].value), parseFloat(savetable[i].cellparaarray[b].xsnumber));

								}
							}
						} else if (recitemdataobj[a].sourcetype == '外部数据源' && savetable[i].cellparaarray[b].resource == '外部数据源') {
							if (savetable[i].cellparaarray[b].itemdata == recitemdataobj[a].name && savetable[i].cellparaarray[b].sumtype == recitemdataobj[a].sumtype && savetable[i].cellparaarray[b].resourcedataid == recitemdataobj[a].sourceid) {
								if (!recitemdataobj[a].value) {
									savetable[i].cellparaarray[b].value = getPointNum(parseFloat(savetable[i].cellparaarray[b].defauldisplay), parseFloat(savetable[i].cellparaarray[b].xsnumber));

								} else {
									savetable[i].cellparaarray[b].value = getPointNum(parseFloat(recitemdataobj[a].value), parseFloat(savetable[i].cellparaarray[b].xsnumber));

								}
							}
						}


					}

				}
			}
		}
	}

	record();



}

//初始化数据项方法
function stringTonum(a) {
	var str = a.toLowerCase().split("");
	var al = str.length;
	var getCharNumber = function (charx) {
		return charx.charCodeAt() - 96;
	};
	var numout = 0;
	var charnum = 0;
	for (var i = 0; i < al; i++) {
		charnum = getCharNumber(str[i]);
		numout += charnum * Math.pow(26, al - i - 1);
	};
	return numout;
}

function aa() {
	let a = "OutputButton4";
	sub(a)
}

function search3() {
	// alert("sd")
	search('ParameterReport22', [])
	// search('ParameterReport2',c1)
	// sub("OutputButton5")
}

function search2() {

	sub("OutputButton9")
	// initMainChart(d, c);
}

function search1() {
	//let a =[{"id":null,"value":"1","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:01:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"101","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"20.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"30.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本1","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:10:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"101","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"200.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"300.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本10","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"3","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:11:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"102","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"201.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"301.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本11","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"4","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:12:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"103","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"202.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"302.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本12","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"5","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:13:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"104","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"203.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"303.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本13","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"6","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:14:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"105","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"204.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"304.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本14","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"7","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:15:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"106","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"205.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"305.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本15","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"8","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:16:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"107","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"206.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"306.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本16","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"9","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:17:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"108","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"207.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"307.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本17","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"10","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:18:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"109","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"208.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"308.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本18","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"11","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 0:19:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"110","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"209.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"309.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本19","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"12","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"2020/6/30 1:40:00","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"-2","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"-2.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"-3.98765","modify":null,"modifyname":null,"modifytime":null},{"id":null,"value":"静态文本100","modify":null,"modifyname":null,"modifytime":null}]
	// search('ParameterReport21',c1)
	// search('ParameterReport2',c1)
	sub("OutputButton9")
	// alert("sd")

}

function search(id, data) {

	console.log('数据', data)
	for (let i = 0; i < savetable.length; i++) {
		if (id == savetable[i].paraname) {

			var delnum = 0
			var endx = $($("#" + savetable[i].paraname).find('tr')[parseInt(savetable[i].startpoy) + 1]).find('td').length - 1;
			var endy = $("#" + savetable[i].paraname).find('tr').length - 1;
			let b = $('#' + savetable[i].paraname).find('input').length;
			for (let i1 = 0; i1 < savetable[i].kzresourcedataitemarray1.length; i1++) {
				var c = savetable[i].kzresourcedataitemarray1[i1].id.split('-');
				if (c[0] >= endx || c[1] >= endy) {
					delnum++
				}
			}
			var delnum1 = savetable[i].kzresourcedataitemarray1.length - delnum
			// alert(b)
			for (let ip = 0; ip < b; ip++) {
				$($('#' + savetable[i].paraname).find('input')[0]).remove();

			}
			if (data == '[]' || !data) {
				var a = [];
			} else {
				if (typeof (data) == 'string') {
					let daiarr = group(JSON.parse(data), savetable[i].kzresourcedataitemarray1.length)
					for (let i2 = 0; i2 < daiarr.length; i2++) {
						if (daiarr[i2].length > delnum1) {
							daiarr[i2].splice(delnum1, (daiarr[i2].length - delnum1))
						}
					}
					// data = [].concat.apply([], daiarr);
					var a = JSON.parse(data);
				} else {
					let daiarr = group(data, savetable[i].kzresourcedataitemarray1.length)
					for (let i2 = 0; i2 < daiarr.length; i2++) {
						if (daiarr[i2].length > delnum1) {
							daiarr[i2].splice(delnum1, (daiarr[i2].length - delnum1))
						}
					}
					// data = [].concat.apply([], daiarr);
					var a = data;

				}
				// 


			}
			if (typeof (a) == 'string') {
				var wantdata = a;
			} else {
				var wantdata = JSON.stringify(a);
			}

			if (a == null || a.length <= savetable[i].nowend) {
				if (a == null || a == []) {

					savetable[i].tabledata = [];
					savetable[i].nowdata = [];
					savetable[i].daochuend = 1;
					$("#" + savetable[i].paraname + "page").remove();

				} else {

					savetable[i].tabledata = a;

					savetable[i].daochuend = 1;
					savetable[i].nowdata = a;
					$("#" + savetable[i].paraname + "page").remove();

				}

			} else {

				$("#" + savetable[i].paraname + "page").remove();
				if (savetable[i].tabledata.length == 0) {
					$("#" + savetable[i].paraname + "page").remove();

					if ($("#" + savetable[i].paraname + "page")) {
						$("#" + savetable[i].paraname + "page").remove()
					}
					let a1 =
						`<div class="page2" style="position:absolute" id="` + savetable[i].paraname +
						`page">
					    <div class="page1" id="id">
						<div class="start">1</div>
						     <div class="next"><img src="src/img/552cc14536532.png" ></div>
							 <div class="jump">
								 <input type="text" class="numinp">
							 </div>
							 <div class="last"><img src="src/img/right_.png" ></div>
							 <div class="end"></div>
							</div>
							</div>`
					// savetable[i].page = a1
					$("body").append(a1)


					// $("#" + savetable[i].paraname + "page").show();

					// $('body').append(savetable[i].page)
					savetable[i].tabledata = a;
					var numd = savetable[i].nowend;


					// let numd = savetable[i].nowdata.length;
					savetable[i].nowdata = JSON.parse(wantdata).splice(0, numd);

					$("#" + savetable[i].paraname + "page").find(".numinp")[0].value = 1;
					$("#" + savetable[i].paraname + "page").find(".end")[0].innerHTML = Math.ceil(JSON.parse(wantdata).length / numd);
					savetable[i].daochuend = Math.ceil(JSON.parse(wantdata).length / numd);
				} else {
					$("#" + savetable[i].paraname + "page").remove();
					// $("#" + savetable[i].paraname + "page").show();


					savetable[i].tabledata = a;
					var numd = savetable[i].nowend;
					// let numd = savetable[i].nowdata.length;
					savetable[i].nowdata = JSON.parse(wantdata).splice(0, numd);

					if (a.length <= savetable[i].nowend) {

						$("#" + savetable[i].paraname + "page").find(".numinp")[0].value = 1;
						$("#" + savetable[i].paraname + "page").find(".end")[0].innerHTML = Math.ceil(JSON.parse(wantdata).length / numd);
						savetable[i].daochuend = Math.ceil(JSON.parse(wantdata).length / numd);
					} else {
						$("#" + savetable[i].paraname + "page").remove();

						// 	alert("asd4")
						if (savetable[i].page) {
							if (savetable[i].page.length == 0) {
								let a1 =
									`<div class="page2" style="position:absolute" id="` + savetable[i].paraname +
									`page">
							 	    <div class="page1" id="id">
							 		<div class="start">1</div>
							 		     <div class="next"><img src="src/img/552cc14536532.png" ></div>
							 			 <div class="jump">
							 				 <input type="text" class="numinp">
							 			 </div>
							 			 <div class="last"><img src="src/img/right_.png" ></div>
							 			 <div class="end"></div>
							 			</div>
							 			</div>`
								$("body").append(a1)
							} else {
								$("body").append(savetable[i].page)
							}

							// alert("asd")


						} else {
							let a1 =
								`<div class="page2" style="position:absolute" id="` + savetable[i].paraname +
								`page">
								    <div class="page1" id="id">
									<div class="start">1</div>
									     <div class="next"><img src="src/img/552cc14536532.png" ></div>
										 <div class="jump">
											 <input type="text" class="numinp">
										 </div>
										 <div class="last"><img src="src/img/right_.png" ></div>
										 <div class="end"></div>
										</div>
										</div>`
							$("body").append(a1)

						}

						// savetable[i].page = a1


						$("#" + savetable[i].paraname + "page").find(".numinp")[0].value = 1;
						$("#" + savetable[i].paraname + "page").find(".end")[0].innerHTML = Math.ceil(JSON.parse(wantdata).length / numd);
						savetable[i].daochuend = Math.ceil(JSON.parse(wantdata).length / numd);
					}

				}



			}

		}


	}

	setbodydata(1);
	// record();

}

function getCell(name, col, row) {
	for (let i = 0; i < this.savetable.length; i++) {
		if (name == this.savetable[i].paraname) {
			row = parseInt(this.savetable[i].startpox) + parseInt(row) - 1
			col = parseInt(this.savetable[i].startpoy) + parseInt(col) - 1
			if (row >= parseInt(this.savetable[i].startpox) && col > parseInt(this.savetable[i].startpoy)) {
				if ($($('#' + name).find("#" + row + "-" + col)[0]).find('input')[0]) {
					return $($($('#' + name).find("#" + row + "-" + col)[0]).find('input')[0]).val()
				} else {
					return null
				}
			} else {
				return null
			}

		}

	}

}
$('.btabletop')[0].addEventListener("mousedown", function (e) {

	window.event.stopPropagation()
	var x = 0;
	var y = 0;
	var l = 0;
	var t = 0;
	var isDown = false;
	x = window.event.clientX;
	y = window.event.clientY;
	//获取左部和顶部的偏移量
	l = $('.btablecover')[0].offsetLeft;
	t = $('.btablecover')[0].offsetTop;
	//开关打开
	isDown = true;
	var pdmove = false

	//设置样式  
	// $('body')[0].style.cursor = 'move';
	$('body')[0].addEventListener("mousemove", function (e) {
		// $('body')[0].style.cursor = 'move';
		pdmove = true
		if (isDown == false) {
			return;
		}
		//获取x和y
		var nx = window.event.clientX;
		var ny = window.event.clientY;
		//计算移动后的左偏移量和顶部的偏移量
		var nl = nx - (x - l);
		var nt = ny - (y - t);
		$('.btablecover')[0].style.left = nl + 'px';
		$('.btablecover')[0].style.top = nt + 'px';


	})
	$('body')[0].addEventListener("mouseup", function (e) {

		//开关关闭
		isDown = false;
		// $('body')[0].style.cursor = 'default';
	})
})
// getCell("ParameterReport11","1",'3');
// console.log(getCell("ParameterReport11","1",'1'))
jsObj.getChartData(function (e) {

})
