@echo off
rem �ж��Ƿ����QQ����� ������Ĭ�ϰ�װλ��
if exist "C:\Program Files (x86)\Tencent\QQBrowser\QQBrowser.exe" (goto setcookie) else (goto err)

:setcookie
SETLOCAL ENABLEDELAYEDEXPANSION
for /f %%a in ('wmic nicconfig where^(ipenabled^=true^) get index^|findstr [0-99]') do set i=%%a
for /f %%a in ('wmic nicconfig where^(index^=%i%^) get macaddress^|findstr [0-99]') do set a=%%a &set a=!a::=-!

start "C:\Program Files (x86)\Tencent\QQBrowser\QQBrowser.exe" http://www.cc.com/JxcOrder/getmac?mac=%a%
exit

:err
rem ���������Ϣ
color fC
echo δ�ҵ�QQ�����
echo �밲װQQ���������¼ϵͳ���������д�ע�����
color f1
echo ���Ѱ�װQQ�����,����ϵ������Ա����ע��
pause

