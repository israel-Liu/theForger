---
title: X86_Assembly
date: 2017-05-09 20:00:13
tags:
---
#### 4.1.5 Memory
![Little_Endian](https://github.com/israel-Liu/theForger/raw/master/images/Little_Endian.png)

[Microsoft Macro Assembler Reference](https://docs.microsoft.com/en-us/cpp/assembler/masm/microsoft-macro-assembler-reference?view=vs-2019)


## Introduction

Who want to learn assembly language on a given assembler only need to read the first section and the chapter in the second section。


## X86 Architecture

1. EAX : Accumulator register. Used in arithmetic operations.
2. ECX : Counter register. Used in shift/rotate instructions.
3. EDX : Data register. Used in arithmetic operations and I/O operations.
4. EBX : Base register. Used as a pointer to data (located in DS in segmented mode).
5. ESP : Stack Pointer register. Pointer to the top of the stack.
6. EBP : Stack Base Pointer register. Used to point to the base of the stack.
7. ESI : Source register. Used as a pointer to a source in stream operations.
8. EDI : Destination register. Used as a pointer to a destination in stream operations.

The 6 Segment Registers are:
• SS : Stack Segment. Pointer to the stack.
• CS : Code Segment. Pointer to the code.
• DS : Data Segment. Pointer to the data.
• ES : Extra Segment. Pointer to extra data. ('E' stands for "Extra")
• FS : F Segment. Pointer to more extra data. ('F' comes after 'E')
• GS : G Segment. Pointer to still more extra data. ('G' comes after 'F')

The EFLAGS is a 32 bits register used as a vector to store and control the results of operations and the state of the processor.

The EIP register contains the address of the next instruction to be executed if no branching is done.
EIP can only be read through the stack after a call instruction。

### Stack
The Stack is usually used to pass arguments to functions or procedures and also to keep track of control flow when the call instruction is used. 
The other common use of the Stack is temporarily saving registers.


## CPU Operation Modes


## Comments
; 后面同一行的是注释，也可以使用 HLA C / Cpp 方式注释。

## 16 32 and 64 Bits

### 32-Bit Addressing
"Flat addressing" scheme, where the address in the register directly points to a physical memory location.


## X86 Instructions
The movsb instruction copies one byte from the location specified in esi to the location specified in edi.
The movsw instruction copies one word (two bytes) from the location specified in esi to the location specified in edi.


## Control Flow

### Function Calls
call proc (pushes the value EIP+4 onto the top of the stack, and jumps to the specified location)

## Arithmetic

### Shift and Rotate
In a rotate instruction, the bits that slide off the end of the register are fed back into the spaces.

	ror arg
	rotate to the right
	rol arg
	rotate to the left
	
	
### Other Instructions

	sahf
	Stores the content of AH register into the lower byte of the flag register.
	lahf
	Loads the AH register with the contents of the lower byte of the flag register.
	
### I/O Instructions


### System Instructions
	sysenter
	This instruction causes the processor to enter protected system mode.
	sysexit
	This instruction causes the processor to leave protected system mode, and enter usermode.
	
## X86 Interrupts


## Interrupt Instruction
int arg
This instruction calls the specified interrupt.


### Types of Interrupts
There are 3 types of interrupts: Hardware Interrupts, Software Interrupts and Exceptions.


## x86 Assemblers


## GAS Syntax
GCC 的后端 ，先跳过。


## MASM Syntax
应该要详细看下了。

## HLA Syntax

## FASM Syntax

## NASM Syntax

## Example I/O (Linux)

## Floating Point

## MMX


## Advanced x86

