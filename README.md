# pentest tools electron
A pentest tools builded in electron, created with, nodejs, typescript, react

This app needs some packages to run (docker, docker-compose, nmap).

Intalling using linux terminal.

If you run as user use run and download .AppImage: 

1 - ```sudo apt install nmap```

2 - Download .AppImage executable:

https://drive.google.com/file/d/1k29A-kdsSvHUn2dJqKtaDdR0S7xDuLld/view?usp=sharing

If you run as dev need install docker and docker-compose:

```sudo apt install docker.io```

```sudo apt install docker-compose```

Setup ambient:

```npx prisma init```

```npx prisma generate```

```npm i```

```npm start```

Software under development, but scan network is already in operation. Some actions requires a root exec.

Fields syntax:

1 - Address -> insert url, ip, ip range or ips.                                                                                                                                                            

Ip: ```192.168.0.0-255```.                                                                                                                                                       

Ips: ```192.168.0.1 192.168.0.2```.                                                                                                                                                                         

Url: ```https://excample.com``` or ```example.com```.
