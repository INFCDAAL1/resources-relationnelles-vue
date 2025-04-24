FROM node:latest

RUN npm install -g npm@11.3.0
RUN apt update && apt install -y adb sdkmanager && apt clean

RUN wget https://download.oracle.com/java/24/latest/jdk-24_linux-x64_bin.deb
RUN dpkg -i jdk-24_linux-x64_bin.deb
RUN rm jdk-24_linux-x64_bin.deb
RUN update-alternatives --list java

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-24-openjdk-amd64
# Set PATH environment variable to include Java binaries
ENV PATH=$JAVA_HOME/bin:$PATH

# Install Android SDK Command-line Tools
ENV ANDROID_SDK_ROOT=/opt/android-sdk

# Set environment variables for Android SDK
ENV PATH="${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}"
ENV ANDROID_HOME=$ANDROID_SDK_ROOT

# Accept Android licenses
RUN yes | sdkmanager --licenses

# Install required SDK packages
RUN sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"

# Ensure default `node` user has access to `sudo`
# ARG USERNAME=node
# RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
#     && chmod 0440 /etc/sudoers.d/$USERNAME

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# npm install -g npm@11.3.0 && apt update && apt install -y adb sdkmanager && apt clean && wget https://download.oracle.com/java/24/latest/jdk-24_lnux-x64_bin.deb && dpkg -i jdk-24_linux-x64_bin.deb && rm jdk-24_linux-x64_bin.deb && update-alternatives --list java && JAVA_HOME=/usr/lib/jvm/jdk-24.0.1-oracle-x64 && PATH=$JAVA_HOME/bin:$PATH && ANDROID_SDK_ROOT=/opt/android-sdk && PATH="${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}" && ANDROID_HOME=$ANDROID_SDK_ROOT && yes | sdkmanager --licenses && sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
