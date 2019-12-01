---
title: TCP/IP ARCHITECTURE DESIGN AND IMPLEMENTATION IN LINUX
date: 2019-08-01 09:51:05
tags: [network, TCP-IP]
categories:
- [network, TCP-IP]
- [Linux]
---

# 1 INTRODUCTION 1
client – server, server 监听端口，等待 client 请求。
[source](https://kernel.googlesource.com/pub/scm/linux/kernel/git/stable/linux.git/+/refs/heads/master)

## 1.1 Overview of TCP/IP Stack 2
[skbuff.h](https://kernel.googlesource.com/pub/scm/linux/kernel/git/stable/linux.git/+/refs/heads/master/include/linux/skbuff.h)

### 1.1.1 Moving Down the Stack 3
在用户层发起，沿着协议栈向下组装数据，然后发送。

### 1.1.2 Moving Up the Stack 5
接收端收到数据，沿着协议栈向上解包数据，最后到应用层。(iocp是在用户层使用的？本机通信是否用到协议栈)

## 1.2 Source Code Organization for Linux 2.4.20 5

### 1.2.1 Source Code Organization for Networking Code 7

## 1.3 TCP/IP Stack and Kernel Control Paths 7
发送数据可以从应用层到达任何一层栈，然后会有对应的路径继续处理，接收栈归为整体分3步处理。

## 1.4 Linux Kernel Until Version 2.4 Is Non-preemptible 11
系统内核发生中断，用户层发起中断。那些CPU寄存器还是要复习一下。
[X86_Assembly](https://israel-liu.github.io/2017/05/09/X86-Assembly/)

### 1.4.1 System Call on Linux 14

### 1.4.2 Adding New System Call 16
编写系统需要了解。

## 1.5 Linux Process and Thread 17
用户模式和核心模式用户栈不同 context 不同，task_struct结构体内容不同。
每个进程关连一个系统级别线程(无用户模式下？)，也是task_struct类型的对象。

### 1.5.1 fork() 17
Processes created。user stacks for child and parent are shared(增长后有自己的副本)

### 1.5.2 Thread 18
分用户类型和内核类型，用户级别的就用户调度，对应用户进程的内核线程还是唯一的。
内核级别的线程更像轻量级进程，是调度单位。对同一个线程的调度不影响同一进程的其它线程。

### 1.5.3 Kernel Threads 19
Kernel threads are created by making a call to kernel_thread() .(关联进程？)

## 1.6 Kernel Synchronization Mechanism 22
synchronize access to kernel global data structures across different kernel
control paths and also across CPUs。

### 1.6.1 Semaphore 22

### 1.6.2 Atomic Operations 23

### 1.6.3 Spin Lock 23

## 1.7 Application Interfaces for TCP/IP Programming 24
The client sends out a request to the server for the service, 
which in turn offers its services once they are connected to each other.

### 1.7.1 Server Application 25
services 和服务端口号关联。Http Server(其实就是service) 关联端口号 80。
Port is a unique number that identifi es a connection or specific services on a given host。
我们向系统注册服务的时候，系统服务应用程序会提供一个唯一端口号和我们的service关联。
The socket is a framework to communicate with the network protocol within the kernel.

### 1.7.2 Client Application 27
通过ip地址找到主机，通过端口找到服务。

### 1.7.3 Socket Options 29
setsockopt () . getsockopt () .
 
### 1.7.4 Option Values 29
SO_DEBUG, SO_BROADCAST, SO_REUSEADDR, SO_KEEPALIVE, SO_LINGER, SO_OOBINLINE, SO_RCVBUF,
SO_DONTROUTE, SO_RCVTIMEO, SO_SNDTIMEO, 

## 1.8 Shutdown 35
```Cpp
int shutdown(int socket, int how);
```

### 1.8.1 Kernel Shutdown Implementation 36
SEND_SHUTDOWN, RCV_SHUTDOWN

### 1.8.2 Send Shutdown 36

### 1.8.3 Receive Shutdown 36

## 1.9 I/O 38

### 1.9.1 read() 38

### 1.9.2 write() 38

### 1.9.3 recv() 38

### 1.9.4 send() 39

### 1.9.5 select() 39
The added feature is to do I/O multiplexing demultiplexing.

## 1.10 TCP State 39
TCP three - way handshake. 成功后进入连接状态。
```
	1. Connection initiation (active and passive)
	2. Established connection
	3. Connection closure (active and passive)
```
Four - way connection closure process. 完成后进入关闭状态。
TIME_WAIT2 state is skipped as ACK is piggybacked with FIN segment.
	
### 1.10.1 Partial Close 45
Time - line diagram for client that issues shutdown on write.

### 1.10.2 tcpdump Output for Partial Close 47

## 1.11 Summary 48
TCP data may be queued at different levels such as socket ’ s send queue, 
device queue (TOS), and CPU output queue.

# 2 PROTOCOL FUNDAMENTALS 49
TCP manages connection and data integrity, whereas IP is responsible for delivery of data to the correct destination.

## 2.1 TCP 50

### 2.1.1 TCP Header 50
Port Numbers, Sequence Number, Acknowledgment Number, Header Length, 
Unused Field, TCP Flags, Window Size, Checksum, Urgent Pointer

## 2.2 TCP Options (RFC 1323) 54

#### 2.2.1 mss Option 55

#### 2.2.2 Window-Scaling Option 55

#### 2.2.3 Timestamp Option 56

#### 2.2.4 Selective Acknowledgment Option 57

## 2.3 TCP Data Flow 58

2.3.1 ACKing of Data Segments 58

2.4 Delayed Acknowledgment 67

2.5 Nagle’s Algorithm (RFC 896) 69

2.6 TCP Sliding Window Protocol 72

2.7 Maximizing TCP Throughput 79

2.8 TCP Timers 82

2.8.1 Retransmission Timer 82

2.8.2 Persistent Timer 83

2.8.3 Keepalive Timer 84

2.8.4 TIME_WAIT Timer 85

2.9 TCP Congestion Control 85

2.10 TCP Performance and Reliability 86

2.10.1 RTTD 86

2.10.2 SACK/DSACK 86

2.10.3 Window Scaling 87

2.11 IP (Internet Protocol) 87

2.11.1 IP Header 88

2.12 Routing 90

2.13 netstat 90

2.14 traceroute 92

2.14.1 traceroute Mechanism 93

2.15 ICMP 93

2.16 ping 95

2.17 ARP/RARP 97

2.18 Summary 99

# 3 KERNEL IMPLEMENTATION OF SOCKETS 101

3.1 Socket Layer 102

3.2 VFS and Socket 103

3.3 Protocol Socket Registration 105

3.4 struct inet_protosw 107

3.5 Socket Organization in the Kernel 107

3.6 Socket 108

3.7 inet_create 110

3.7.1 Sock 112

3.8 Flow Diagram for Socket Call 118

3.9 Summary 118

# 4 KERNEL IMPLEMENTATION OF TCP CONNECTION SETUP 121

4.1 Connection Setup 122

4.1.1 Server Side Setup 122

4.1.2 Server Side Operations 124

4.2 Bind 124

4.2.1 Data Structures Related to Socket BIND 125

4.2.2 Hash Buckets for tcp Bind 125

4.2.3 tcp_ehash 125

4.2.4 tcp_listening_hash 125

4.2.5 tcp_bhash 125

4.2.6 tcp_hashinfo 126

4.2.7 tcp_bind_hashbucket 129

4.2.8 tcp_bind_bucket 129

4.2.9 bind() 130

4.2.10 sys_bind() 130

4.2.11 sockfd_lookup() 130

4.2.12 fget() 131

4.2.13 inet_bind() 131

4.2.14 tcp_v4_get_port() 133

4.2.15 tcp_bind_confl ict() 135

4.3 Listen 137

4.3.1 sys_listen() 138

4.3.2 inet_listen() 139

4.3.3 tcp_listen_start() 139

4.3.4 Listen Flow 142

4.3.5 struct open_request 142

4.3.6 Accept Queue Is Full 147

4.3.7 Established Sockets Linked in tcp_ehash Hash Table 150

4.3.8 State of the Connection Request when the Three-Way Handshake Is Still Pending 150

4.3.9 State of the Connection Request when the Three-Way Handshake Is Completed 151

4.4 Connection Request Handling by Kernel 151

4.4.1 SYN Queue Processing 155

4.4.2 Accept Queue Processing 155

4.4.3 Flow Control for Handling a New Connection Request 156

4.5 Accept 156

4.5.1 inet_accept() 159

4.5.2 Linking of Inode and Socket Data Structures when the Three-Way Handshake Has Completed and Is Accepted by Application 161

4.5.3 Linking of VFS and Socket Data Structures in the Kernel when a New Connection Is Established 162

4.5.4 File Table Entry of a New Accepted Connected Socket 162

4.5.5 Flow Control for Accepting New Established Connections 162

4.6 Client Side Setup 163

4.6.1 Client Side Operations 164

4.6.2 Connect 164

4.6.3 tcp_v4_connect() 167

4.6.4 ip_route_connect() 167

4.6.5 Flow Control for Generating a Connection Request 167

4.6.6 tcp_v4_hash_connect() 170

4.6.7 __tcp_v4_check_established() 171

4.6.8 tcp_connect() 174

4.6.9 tcp_transmit_skb() 176

4.7 Summary 178

# 5 sk_buff AND PROTOCOL HEADERS 181

5.1 struct sk_buff 182

5.2 struct skb_shared_info 186

5.3 sk_buff and DMA—SKB_FRAG_STRUCT 187

5.3.1 DMA and Fragmented sk_buff Containing Paged Data 188

5.3.2 sk_buff and IP Fragmentation 188

5.3.3 sk_buff and Fragmentation 190

5.4 Routines Operating on sk_buff 190

5.4.1 alloc_skb() 190

5.4.2 skb_reserve() 191

5.4.3 skb_put() 192

5.4.4 skb_push() 194

5.4.5 skb_pull() 195

5.5 sk_buff Builds Protocol Headers as It Traverses Down the Protocol Layers 196

5.5.1 Tcp Header Is Added to sk_buff 196

5.5.2 Ip Header Is Added to sk_buff 197

5.5.3 Link Layer Header Is Added to sk_buff 198

5.6 sk_buff Extracts Protocol Headers as It Traverses Up the Protocol Layers When a Packet Arrives 199

5.6.1 sk_buff Is Made to Point to a Datalink Layer Header Which Will Be Processed by a Dalalink Driver 199

5.6.2 sk_buff Is Made to Point to an ip Layer Header Which Will Be Processed by an IP Layer 200

5.6.3 sk_buff Is Made to Point to a tcp Layer Header Which Will Be Processed by a tcp Layer 200

5.7 Summary 202

# 6 MOVEMENT OF sk_buff ACROSS PROTOCOL LAYERS 205

6.1 Packet Traversing Down the TCP/IP Stack 206

6.1.1 Path of Packet Traversal from Socket Layer to Device for Transmission 207

6.1.2 Kernel Path for TCP Packet Traversing Down the Stack 208

6.2 Routed Packet Ready for Transmission 214

6.3 Kernel Flow for a Packet Moving Down the Stack 214

6.4 Packet Traversing Up the TCP/IP Stack 214

6.4.1 Path of Packet Traversal from Device (Reception) to Socket Layer 219

6.4.2 Kernel Path for TCP Packet Traversing Up the Stack 219

6.5 Kernel Flow for a Packet Moving Up the Stack 225

6.6 Summary 225

# 7 TCP SEND 231

7.1 TCP Segmentation Unit for Sending Data 232

7.1.1 Functioning of Segmentation Unit without Scatter–Gather Support 232
7.1.2 Segmentation without Scatter–Gather Support 234
7.1.3 1 mss of Data Written over the Socket 235

7.2 Segmentation with Scatter–Gather Technique 235

7.2.1 Segmentation with Scatter–Gather Support 239
7.2.2 Application Writes Y Bytes over the Socket 239
7.2.3 can_coalesce() 239
7.2.4 tcp_copy_to_page() 240
7.2.5 tcp_mark_push() 241
7.2.6 forced_push() 241
7.2.7 tcp_push() 242
7.2.8 __tcp_push_pending_frames() 243
7.2.9 tcp_snd_test() 243
7.2.10 tcp_nagle_check() 244
7.2.11 tcp_minshall_ckeck() 245
7.2.12 tcp_write_xmit() 245
7.2.13 update_send_head() 247
7.2.14 tcp_push_one() 247
7.2.15 skb_entail() 248

7.3 Sending OOB Data 249

7.4 Flow for TCP Segmentation Unit and Send Process 250

7.5 Functional Level Flow for Segmentation and Send Mechanism 250

7.6 Summary 251

# 8 TCP RECEIVE 255

8.1 Queuing Mechanism 256

8.1.1 Processing in tcp_rcv_established() 256
8.1.2 tcp_prequeue() 258
8.1.3 Processing of Queues 259
8.1.4 tcp_data_wait() 263
8.1.5 tcp_prequeue_process() 264
8.1.6 lock_sock() 265
8.1.7 __lock_sock() 265
8.1.8 release_sock() 266
8.1.9 __release_sock() 266

8.2 Processing of TCP Data from the Receive Queue 267

8.2.1 cleanup_rbuf() 268
8.2.2 skb_copy_datagram_iovec() 271
8.2.3 Reading Data from Receive Buffer without Paged Data Area 273
8.2.4 X Bytes Requested from the Application 273
8.2.5 1 mss = n Bytes Requested from the Application 275
8.2.6 n − X Bytes Requested from the Application 275
8.2.7 Consumption of Data from a Paged Buffer 275
8.2.8 n Bytes Requested by the Application 276
8.2.9 One Page of Data Requested by the Application 276

8.3 TCP Urgent Byte Processing 276

8.3.1 Urgent Byte Read as OOB Data 277
8.3.2 tcp_recv_urg() 278
8.3.3 Urgent Mode Processing and Reading an Urgent Byte as Inline Data 280

8.4 DATA Flow Diagram for Receiving Data over the TCP Socket 284

8.5 Summary 290

# 9 TCP MEMORY MANAGEMENT 291

9.1 Transmit Side TCP Memory Management 291

9.1.1 select_size() 294
9.1.2 tcp_alloc_pskb() 295
9.1.3 alloc_skb() 296
9.1.4 tcp_alloc_page() 297
9.1.5 skb_charge() 298
9.1.6 tcp_mem_schedule() 298
9.1.7 tcp_free_skb() 300
9.1.8 sock_wfree() 300
9.1.9 tcp_write_space() 301
9.1.10 tcp_mem_reclaim() 302
9.1.11 __tcp_mem_reclaim() 302
9.1.12 wait_for_tcp_memory() 303

9.2 Receive Side TCP Memory Management 305

9.2.1 tcp_prune_queue() 308
9.2.2 tcp_clamp_window() 309
9.2.3 tcp_collapse_ofo_queue() 311
9.2.4 tcp_collapse() 312
9.2.5 __skb_queue_purge() 317

9.3 Freeing of Memory Allocated to a Receive Buffer 319

9.4 System-Wide Control Parameters Are Worth Noticing When It Comes to TCP Memory Management 319

9.5 Summary 321

# 10 TCP TIMERS 323

10.1 Timers in Linux 324

10.1.1 mod_timer() 324
10.1.2 detach_timer() 325
10.1.3 del_timer() 325
10.1.4 When Are Timer Routines Executed? 326

10.2 TCP Retransmit Timer 326

10.2.1 When Do We Set Retransmit Timer? 327
10.2.2 When Do We Reset or Cancel Retransmit Timers? 327
10.2.3 tcp_enter_loss() 330
10.2.4 tcp_retransmit_skb() 333
10.2.5 tcp_retrans_try_collapse() 334
10.2.6 skb_cloned() 336

10.3 Zero Window Probe Timer 336

10.3.1 When Is the First Time Probe Timer Installed? 337
10.3.2 When Is the Probe Timer Canceled for the Connection? 337
10.3.3 tcp_ack_probe() 338
10.3.4 How Does the Window Probe Timer Work? 338
10.3.5 tcp_probe_timer() 339
10.3.6 tcp_send_probe0() 339
10.3.7 tcp_write_wakeup() 339

10.4 Delay ACK Timer 342

10.4.1 When Is the ACK Scheduled? 344
10.4.2 How and When Is the ACK Segment Sent? 344
10.4.3 Quick ACK Mode 345
10.4.4 __tcp_ack_snd_check() 345
10.4.5 tcp_ack_snd_check() 346
10.4.6 tcp_send_delayed_ack() 347
10.4.7 tcp_delack_timer() 348
10.4.8 tcp_reset_xmit_timer() 349
10.4.9 tcp_write_timer() 351
10.4.10 tcp_clear_xmit_timer() 352

10.5 Keepalive Timer 353

10.5.1 When Is the Keepalive Timer Activated? 353
10.5.2 How Is the Timer Reset? 354
10.5.3 tcp_keepalive_timer() 354

10.6 SYN-ACK Timer 356

10.6.1 When Is the SYN-ACK Timer Activated? 356
10.6.2 When Is the SYN-ACK Timer Stopped? 357
10.6.3 tcp_synack_timer() 357

10.7 TIME_WAIT Timer 361

10.7.1 When Do We Trigger TIME_WAIT Timer? 361
10.7.2 tcp_time_wait() 362
10.7.3 tcp_tw_schedule() 362
10.7.4 Non-recycle Mode 363
10.7.5 Recycle Mode 365
10.7.6 tcp_twkill() 367
10.7.7 tcp_twcal_tick() 370
10.7.8 __tcp_tw_hashdance() 374

10.8 Summary 375

# 11 TCP CORE PROCESSING 377

11.1 TCP Incoming Segment Processing 378

11.1.1 Prediction Flags 378
11.1.2 Building Prediction Flags 379
11.1.3 Condition to Enable the Fast Path 380
11.1.4 When to Enable the Slow Path 382
11.1.5 When to Enable the Fast Path 382
11.1.6 Points to Remember about Prediction Flags 383

11.2 Fast Path Processing 384

11.3 Slow Path Processing 386

11.3.1 tcp_sequence() 387
11.3.2 tcp_replace_ts_recent() 387
11.3.3 tcp_event_data_recv() 390
11.3.4 tcp_incr_quickack() 391
11.3.5 tcp_grow_window() 392
11.3.6 __tcp_grow_window() 393
11.3.7 How Do We Calculate Window to Be Advertised? 394
11.3.8 tcp_receive_window() 395
11.3.9 __tcp_select_window() 395
11.3.10 tcp_space() 397
11.3.11 tcp_data_snd_check() 397
11.3.12 __tcp_data_snd_check() 398
11.3.13 tcp_paws_discard() 398

11.4 Processing of Incoming ACK 400

11.4.1 tcp-packets_in_fl ight() 403
11.4.2 tcp_ack_is_dubious() 404
11.4.3 tcp_cong_avoid() 405
11.4.4 tcp_ack_update_window() 406
11.4.5 tcp_may_update_window() 407
11.4.6 tcp_clean_rtx_queue() 408

11.5 Processing of SACK blocks 410

11.5.1 tcp_sacktag_write_queue() 410

11.6 Reordering Length 417

11.7 Processing TCP Urgent Pointer 421

11.7.1 tcp_check_urg() 422

11.8 Processing Data Segments in Slow Path 424

11.8.1 tcp_sack_new_ofo_skb() 433
11.8.2 tcp_sack_maybe_coalesce() 434
11.8.3 tcp_sack_extend() 435
11.8.4 tcp_ofo_queue() 436
11.8.5 tcp_sack_remove() 441

11.9 Overview of Core TCP Processing 442

11.10 Summary 442

# 12 TCP STATE PROCESSING 445

12.1 Overview of State Processing 446

12.2 TCP States 448

12.2.1 TCP_CA_CWR 449
12.2.2 Undoing from TCP_CA_CWR 449

12.3 Processing of Duplicate/Partial ACKs in Recovery State 449

12.3.1 tcp_remove_reno_sacks() 450
12.3.2 tcp_try_undo_partial() 451

12.4 Processing of Duplicate/Partial ACKs in Loss State 452

12.4.1 tcp_try_undo_loss() 453
12.4.2 tcp_check_sack_reneging() 455

12.5 Default Processing of TCP States 456

12.5.1 tcp_time_to_recover() 459
12.5.2 tcp_head_timedout() 460
12.5.3 tcp_try_to_open() 461
12.5.4 tcp_update_scoreboard() 462
12.5.5 tcp_xmit_retransmit_queue() 464
12.5.6 tcp_packet_delayed() 466

12.6 Processing of TCP Non-open States when ACKed Beyond tp → high_seq 467

12.6.1 TCP_CA_Loss 467
12.6.2 TCP_CA_CWR 468
12.6.3 TCP_CA_Disorder 470
12.6.4 tcp_try_undo_dsack() 471
12.6.5 TCP_CA_Recovery 471
12.6.6 tcp_add_reno_sack() 472
12.6.7 tcp_check_reno_reordering() 473
12.6.8 tcp_may_undo() 473
12.6.9 tcp_packet_delayed() 474
12.6.10 tcp_undo_cwr() 475
12.6.11 tcp_mark_head_lost() 475
12.6.12 tcp_sync_left_out() 477

12.7 Summary 477

# 13 NETLINK SOCKETS 479

13.1 Introduction to Netlink Sockets 479

13.2 Netlink Socket Registration and Initialization at Boot Time 480

13.3 How Is the Kernel Netlink Socket Created? 481

13.4 How Is the User Netlink Socket Created? 482

13.5 Netlink Data Structures 485

13.5.1 nl_table 485
13.5.2 rtnetlink_link 486

13.6 Other Important Data Strutures 488

13.6.1 struct nlmsghdr 488
13.6.2 struct msghdr 489

13.7 Netlink Packet Format 490

13.8 Netlink Socket Example—tc Command for Adding a qdisc 490

13.8.1 tc Command Flow in User Space for Adding a qdisc 490
13.8.2 tc Command in Kernel Space 491
13.8.2.1 sys_sendmsg() 491
13.8.2.2 sock_sendmsg() 492
13.8.2.3 netlink_sendmsg() 492
13.8.2.4 netlink_unicast() 493
13.8.2.5 netlink_data_ready() 494
13.8.2.6 rtnetlink_rcv() 494
13.8.2.7 rtnetlink_rcv_skb() 494
13.8.2.8 rtnetlink_rcv_msg() 495

13.9 Flow Diagram for tc Command in Kernel Space 496

13.10 Summary 496

# 14 IP ROUTING 499

14.1 Routing 501

14.2 Policy-Based Routing 503

14.3 Multipathing 505

14.4 Record Route Options (RFC 791) and Processing by Linux Stack 509

14.4.1 Record Routing 510

14.5 Source Routing 510

14.5.1 Strict Record Routing 510
14.5.2 Loose Record Routing 511
14.5.3 SRR Processing Implementation 511

14.6 Linux Kernel Implementation of Routing Table and Caches 517

14.7 Routing Cache Implementation Overview 517

14.7.1 Routing Cache Data Structures 519

14.8 Managing Routing Cache 523

14.8.1 Routing Cache for Local Connections 525
14.8.2 __sk_dst_check() 526
14.8.3 Link Failure and Reporting to Routing Subsystem 527
14.8.4 dst_link_failure() 527
14.8.5 ipv4_link_failure() 527
14.8.6 dst_set_expires() 528
14.8.7 Routing Cache for the Incoming Packets 529
14.8.8 Routing Cache Timer 530
14.8.9 rt_periodic_timer 530
14.8.10 rt_may_expire() 533
14.8.11 dst_free() 534
14.8.12 __dst_free() 535
14.8.13 dst_destroy() 535
14.8.14 dst_run_gc() 536
14.8.15 Interface down and rt_fl ush_timer 537
14.8.16 rt_cache_fl ush() 538

14.9 Implementation Overview of Forwarding Information Base (FIB) 540

14.9.1 struct fi b_table 540
14.9.2 struct fn_hash 543
14.9.3 struct fn_zone 543
14.9.4 struct fi b_node 544
14.9.5 struct fi b_info 546
14.9.6 struct fi b_nh 547
14.9.7 struct fi b_rule 548

14.10 Adding New Entry in Routing Table Using ip Command (RT Netlink Interface) 549

14.10.1 What Happens When the ip Command Is Run with a Route Option for Adding an Entry in Routing Table? 550
14.10.2 inet_rtm_newroute() 550
14.10.3 struct rtmsg 551
14.10.4 struct kern_rta 552
14.10.5 fn_hash_insert() 553
14.10.6 fn_new_zone() 554
14.10.7 fi b_create_info() 557
14.10.8 fn_hash_insert() 558

14.11 What Happens When the ip Command Is Run with a Rule Option for Adding an Entry in the Routing Table? 558

14.11.1 inet_rtm_newrule() 559
14.11.2 FIB Initialization 561

14.12 FIB Traversal Flow Diagram 563

14.12.1 ip_route_output() 563
14.12.2 ip_route_output_key() 564
14.12.3 ip_route_output_slow() 566
14.12.4 ip_dev_fi nd() 576
14.12.5 __in_dev_get() 577
14.12.6 inet_select_addr() 578
14.12.7 ROUTE__SCOPES 580
14.12.8 fi b_lookup() 581

14.13 Summary 589

# 15 IP QUALITY OF SERVICE IN LINUX (IP QoS) 591

15.1 Introduction 591

15.2 Basic Components of Linux Traffi c Control 592

15.3 Linux Implementation of pfi fo_fast qdisc 593

15.4 Queueing Discipline Data Structure 596

15.4.1 struct Qdisc 596
15.4.2 struct Qdisc_ops 597
15.4.3 struct Qdisc_class_ops 598
15.4.4 struct cbq_class 599

15.5 tc User Program and Kernel Implementation Details 601

15.5.1 tc_modify_qdisc() 601
15.5.2 qdisc_create() 602
15.5.3 cbq_init() 604
15.5.4 qdisc_graft() 604
15.5.5 dev_graft_qdisc() 605

15.6 The tc Commands for Creating Class Hierarchy for CBQ 605

15.6.1 tc_ctl_tclass() 607
15.6.2 cbq_change_class() 607

15.7 Filters 610

15.7.1 tc_ctl_tfi lter() 611

15.8 u32 Filter Implementation 614

15.8.1 u32_change() 615

15.9 Route Filter Implementation 616

15.9.1 route4_change() 618

15.10 Enqueue 619

15.10.1 cbq_enqueue() 620
15.10.2 cbq_classify() 621
15.10.3 Overview of cbq_enqueue() 621

15.11 Overview of Linux Implementation of CBQ 622

15.12 cbq_dequeue() 622

15.12.1 From net/dev/core.c 626
15.12.2 qdisc_run() 626
15.12.3 qdisc_restart() 626
15.12.4 cbq_dequeue() 627
15.12.5 cbq_dequeue_1() 629
15.12.6 cbq_dequeue_prio() 630

15.13 Summary 633

# 16 IP FILTER AND FIREWALL 635

16.1 Netfi lter Hook Framework 636

16.2 Netfi lter Hooks on IP Stack 638

16.2.1 Hooks for Outgoing Packets 638
16.2.2 Hooks for Incoming Packets 639

16.3 Overview of Netfi lter Hooks on Linux TCP-IP Stack 640

16.4 Registration of Netfi lter Hooks 640

16.5 Processing of Netfi lter Hooks 642

16.5.1 nf_hook_slow() 642
16.5.2 nf_iterate() 643
16.5.3 struct nf_hook_ops 644

16.6 Compatibility Framework 644

16.6.1 fw_in() 645

16.7 Ip Chains 647

16.7.1 Filtering with Ipchains 648
16.7.2 Ipchain Chain of Rules 649
16.7.3 struct ip_chain 649
16.7.4 struct ip_fwkernel 650
16.7.5 struct ip_reent 651
16.7.6 struct ip_fw 651
16.7.7 Organization of Tables in Ipchains 652

16.8 How Is the Packet Filtered with Ipchains 653

16.8.1 ip_fw_check() 653
16.8.2 ip_rule_match() 655

16.9 Iptables 655

16.9.1 Registration of Iptables Hooks 657

16.10 Iptables Filter Rules and Target Organization 657

16.10.1 struct ipt_table 658
16.10.2 struct ipt_table_info 658
16.10.3 struct ipt_entry 661
16.10.4 struct ipt_entry_match 662
16.10.5 struct ipt_tcp 663
16.10.6 struct ipt_entry_target 664
16.10.7 struct ipt_standard_target 664

16.11 Organization of Filter Rules and Target for Iptables 664

16.12 Filtering Packets with Iptables 664

16.12.1 ipt_do_table() 664
16.12.2 IPT_MATCH_ITERATE 668

16.13 Summary 668

# 17 NET SOFTIRQ 671

17.1 Why Net SoftIRQs, and How Do We Raise Them? 672

17.1.1 Transmission 672
17.1.2 Reception 672

17.2 How Are SoftIRQs Are Processed, and When? 675

17.3 Registration of SoftIRQs 678

17.4 Packet Reception and Delayed Processing by Rx SoftIRQ 679

17.5 Processing of Net Rx SoftIRQ 682

17.6 Packet Transmission and SoftIRQ 686

17.7 Summary 696

# 18 TRANSMISSION AND RECEPTION OF PACKETS 697

18.1 DMA Ring Buffers for Transmission and Reception of Packets 698

18.2 Packet Reception Process 698

18.2.1 Flow of Packet Reception with DMA 698
18.2.2 Reception Ring Buffer 698

18.3 Packet Transmission Process 700

18.3.1 Flow of Packet Transmission with DMA 702
18.3.2 Transmission Ring Buffer 702
18.3.3 Transmission Ring Buffer 703

18.4 Implementation of Reception and Transmission of Packets 704

18.4.1 struct etrax_eth_descr 705
18.4.2 struct etrax_dma_descr 706
18.4.3 Initialization of Device 707
18.4.5 Initialization of DMA Transmit Ring Buffers 707
18.4.6 Initialization of DMA Receive Ring Buffers 709

18.5 Rx Interrupt for Reception of Packets 709

18.5.1 Rx DMA Buffer Initialized 711
18.5.2 e100_rx() 711
18.5.3 Rx Descriptors After Reception of Three Packets in DMA Buffer Before Rx Interrupt Being Raised 713
18.5.4 Rx Descriptors After First Packet Is Pulled Out of DMA Buffer and Given to OS in Rx Interrupt Handler 713

18.6 Transmission of Packets 713

18.6.1 e100_send_packet() 713
18.6.2 Tx DMA Ring Buffer Descriptor After Initialization 717
18.6.3 e100_hardware_send_packet() 717
18.6.4 There Are Two Packets in Device’s DMA Tx Ring Buffer to Be Transmitted 717
18.6.5 e100tx_interrupt() 720
18.6.6 First Packet from the DMA Queue Is Transmitted and Second One Is yet to Be Transmitted; After Interrupt Is Generated, Transmitted Buffer Is Freed 721

18.7 Summary 721

# 19 lkcd AND DEBUGGING TCP/IP STACK 723

19.1 lkcd Source and Patches 724

19.2 Touching the Socket 724

19.3 Looking into the Receive Socket Buffer 726

19.3.1 Route Information in sk_buff 727

19.4 Peep into Send Socket Buffer 727

19.5 TCP Segmentation Unit 729

19.6 Send Congestion Window and ssthresh 730

19.7 Retransmissions and Route 733

19.8 Peeping into Connection Queues and SYN Queues 733

19.9 Routing and IP Qos lcrash Steps 735

19.9.1 lcrash Steps for Default Queueing Discipline in Linux (pfi fo_fast) 735

19.10 CBQ (Class-Based) Queueing Discipline lcrash Steps 739

19.11 U32 Filters 739

19.12 Route Filters 743

19.13 FIB Table lcrash Output for Setting Up the Realm Using ip Command 745

19.14 lcrash Output for Setting Up Route Filter Using tc Command 749

19.15 Netlink Data Structure 755

19.15.1 nl_table 755

19.15.2 rtnetlink_link 755

19.16 Summary 757

# 20 NEXT EDITION 759

Bibliography 763

Index 765


