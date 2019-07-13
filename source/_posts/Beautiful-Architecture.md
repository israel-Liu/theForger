---
title: Beautiful Architecture
date: 2019-07-05 10:10:07
tags:
---


## Foreword


## Preface


### How This Book Is Organized
overviews, enterprise applications, systems, end-user applications, and programming languages.

### Principles, Properties, and Structures


### Acknowledgments


# P A R T I On Architecture


## C H A P T E R O N E What Is Architecture?


### Introduction
Vitruvius’ ‘On Architecture,’ good building should have Beauty (Venustas), Firmness(Firmitas), and Utility (Utilitas);

	• It has the functionality required by the customer.
	• It is safely buildable on the required schedule.
	• It performs adequately.
	• It is reliable.
	• It is usable and safe to use.
	• It is secure.
	• It is affordable.
	• It conforms to legal standards.
	• It will outlast its predecessors and its competitors.
	
### The Role of Architect
把握整体，先画抽象草图，再构建细节，最后实施。


### The Role of the Software Architect
软件设计难点 the intangible nature of the product, and the complexity of the system. 


### What Constitutes a Software Architecture?
For software systems, these design decisions are behavioral and structural.
External behavioral descriptions show how the product will interface with its users, 
other systems, and external devices, and should take the form of requirements.
Structural descriptions show how the product is divided into parts and the relations between those parts.
Internal behavioral descriptions are needed to describe the interfaces between components.
Structural descriptions often show several distinct views of the same part because it is
impossible to put all the information in one drawing or document in a meaningful way。
Software architectures are often presented as layered hierarchies that tend to commingle several different structures in one diagram.


### Architecture Versus Design
Architecture is a part of the design of the system; it highlights some details by abstracting away from others.
Architecture is thus a subset of design.


### Creating a Software Architecture
	• Funders, who want to know if the project can be completed within resource and schedule constraints
	• Architects, developers, and testers, who are first concerned with initial construction and later with maintenance and evolution
	• Project managers, who need to organize teams and plan iterations
	• Marketers, who may want to use quality concerns to differentiate the system from competitors
	• Users, including end users, system administrators, and the people who do installation, deployment, provisioning, and configuration
	• Technical support staff, who are concerned with the number and complexity of Help Desk calls
	
Functionality, 	Changeability, Performance, Capacity, Ecosystem, Modularity, Buildability, Producibility, Security


### Architectural Structures
1. The Information Hiding Structures, 
2. The Uses Structures, 
3. The Process Structures
4. Access Structures
5. Summary of Structures


### Good Architectures


### Beautiful Architectures
As Ludwig Mies van der Rohe said of good design, “Less is more,” 
and Albert Einstein might say that beautiful architectures are as simple as possible, but no simpler.

### Acknowledgments

### References


## C H A P T E R T W O A Tale of Two Systems: A Modern-Day Software Fable


### The Messy Metropolis
Others are not so lucky, and are essentially software settlements that 
grew up around the accidental gathering of some code.(嗯嗯，我们的工程就是这样的)


### Design Town
模块内Strong cohesion，模块间Low coupling

1. First Steps into Design Town
2. The Story Unfolds

### References


# P A R T I I Enterprise Application Architecture


## C H A P T E R T H R E E Architecting for Scale

### Introduction

### Context
1. The First Goal
2. The Game World
3. Latency Is the Enemy

### The Architecture

### The Macro Structure

### The Basic Services

### Thoughts on the Architecture


## C H A P T E R F O U R Making Memories

### Capabilities and Constraints
1. Workflow
2. Architecture Facets
3. Modules and Launcher
4. ApplicationContext
5. Module dependencies
6. Launcher
7. Kiosk-Style GUI
8. UI and UI Model
9. Forms
10. Properties
11. Bindings
12. Application facade
13. Interchangeable Workstations
14. NIO image transfer

### User Response


### Conclusion

### References

## C H A P T E R F I V E Resource-Oriented Architectures: Being “In the Web”


Chapter 3, Architecting for Scale
Chapter 4, Making Memories
Chapter 5, Resource-Oriented Architectures: Being “In the Web”
Chapter 6, Data Grows Up: The Architecture of the Facebook Platforms

