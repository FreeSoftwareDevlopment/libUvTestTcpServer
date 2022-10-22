cmake_minimum_required (VERSION 3.8)

add_executable (libUvTest "libUvTest.c" "libUvTest.h")

if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET libUvTest PROPERTY CXX_STANDARD 20)
endif()

target_link_libraries(libUvTest uv)
