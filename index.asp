<%
if request.ServerVariables("HTTP_HOST")="www.gonnavis.com" then
Response.Status="301 Moved Permanently"
Response.AddHeader "Location","http://gonnavis.com/timeline/"
Response.End
else
Set fs=Server.CreateObject("Scripting.FileSystemObject")
Set f=fs.OpenTextFile(Server.MapPath("index.html"), 1)
Response.Write(f.ReadAll)
f.Close
Set f=Nothing
Set fs=Nothing
end if
%>